import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CouponRedemption } from '../redemptions/coupon-redemption.entity';
import { Coupon } from '../coupon.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ApplyCouponDto } from '../dtos/apply-coupon.dto';

@Injectable()
export class CouponRedemptionService {
  constructor(
    @InjectRepository(CouponRedemption)
    private readonly couponRedemptionRepository: Repository<CouponRedemption>,
  ) {}

  async createRedemption(
    coupon: Coupon,
    userId: number,
    orderId: number,
    discountAmount: number,
  ) {
    const redemption = this.couponRedemptionRepository.create({
      coupon,
      userId,
      orderId,
      discountAmount,
    });
    await this.couponRedemptionRepository.save(redemption);
    return redemption;
  }

  async getTotalUsage(couponId: number, userId: number): Promise<number> {
    return this.couponRedemptionRepository.count({
      where: { coupon: { id: couponId }, userId },
    });
  }

  async getTotalDiscount(couponId: number, userId: number): Promise<number> {
    const result = await this.couponRedemptionRepository
      .createQueryBuilder('redemption')
      .select('SUM(redemption.discountAmount)', 'total')
      .where('redemption.couponId = :couponId', { couponId })
      .andWhere('redemption.userId = :userId', { userId })
      .getRawOne();
    return Number(result.total) || 0;
  }

  async getUniqueUserCount(couponId: number): Promise<number> {
    const result = await this.couponRedemptionRepository
      .createQueryBuilder('redemption')
      .select('COUNT(DISTINCT redemption.userId)', 'count')
      .where('redemption.couponId = :couponId', { couponId })
      .getRawOne();
    return Number(result.count) || 0;
  }
}
