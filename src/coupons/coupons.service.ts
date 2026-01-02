import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coupon } from './coupon.entity';
import { ApplyCouponDto } from './dtos/apply-coupon.dto';
import { CouponRedemptionService } from './redemptions/coupon-redemption.service';
import { ConfirmCouponDto } from './dtos/confirm-copon.dto';
import { CouponRedemption } from './redemptions/coupon-redemption.entity';

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,
    @InjectRepository(CouponRedemption)
    private readonly couponRedemptionRepository: Repository<CouponRedemption>,
    private readonly couponRedemptionService: CouponRedemptionService,
  ) {}

  async applyCoupon(ApplyCouponDto: ApplyCouponDto, userId: number) {
    const { couponCode, cartTotal } = ApplyCouponDto;
    const coupon = await this.couponRepository.findOne({
      where: { code: couponCode, isActive: true, type: 'ORDER' },
    });

    if (!coupon) {
      throw new BadRequestException('Invalid or inactive coupon code.');
    }
    const now = new Date();
    if (now < coupon.startAt || now > coupon.endAt) {
      throw new BadRequestException('Coupon expired');
    }

    let discount = 0;
    if (cartTotal < coupon.minOrderValue) {
      throw new BadRequestException(`Min order value ₹${coupon.minOrderValue}`);
    }

    if (coupon.perUserLimit !== null) {
      const userUsage = await this.couponRedemptionService.getTotalUsage(
        coupon.id,
        userId,
      );
      if (userUsage >= coupon.perUserLimit) {
        throw new BadRequestException('Per user coupon usage limit exceeded.');
      }
    }
    if (coupon.discountType === 'FLAT') {
      discount = coupon.discountValue;
    } else {
      discount = (cartTotal * coupon.discountValue) / 100;
    }

    if (coupon.maxDiscountValue) {
      discount = Math.min(discount, coupon.maxDiscountValue);
    }

    return {
      couponCode: coupon.code,
      discount,
      finalAmount: cartTotal - discount,
    };
  }
  async confirmCoupon(confirmCouponDto: ConfirmCouponDto, userId: number) {
    const { couponId, orderId, discountAmont } = confirmCouponDto;

    const coupon = await this.couponRepository.findOne({
      where: { id: couponId, isActive: true, type: 'ORDER' },
    });

    if (!coupon) {
      throw new BadRequestException('Invalid or inactive coupon.');
    }

    const alreadyRedeemed = await this.couponRedemptionRepository.findOne({
      where: {
        coupon: { id: couponId },
        orderId,
      },
    });

    if (alreadyRedeemed) {
      throw new BadRequestException('Coupon already redeemed for this order.');
    }

    if (!orderId) {
      throw new BadRequestException('Order ID is required to confirm coupon.');
    }

    const redemption = await this.couponRedemptionService.createRedemption(
      coupon,
      userId,
      orderId,
      discountAmont,
    );
    return {
      status: true,
      message: 'Coupon confirmed and redemption recorded.',
      redemption,
    };
  }
}
