import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coupon } from './coupon.entity';
import { ApplyCouponDto } from './dtos/apply-coupon.dto';

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,
  ) {}

  async applyOrderDiscount(ApplyCouponDto: ApplyCouponDto) {
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
}
