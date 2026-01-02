import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CouponRedemption } from '../redemptions/coupon-redemption.entity';
import { Coupon } from '../coupon.entity';
@Injectable()
export class CouponAnalyticsService {

    constructor(
        @InjectRepository(CouponRedemption)
        private readonly couponRedemptionRepository: Repository<CouponRedemption>,
    ) {}

    async getCouponAnalytics(couponId: number) {
        const totalUses = this.couponRedemptionRepository.count({ where: { coupon: { id: couponId } } });

        const UniqueUserResult = await this.couponRedemptionRepository
            .createQueryBuilder('redemption')
            .select('COUNT(DISTINCT redemption.userId)', 'uniqueUsers')
            .where('redemption.couponId = :couponId', { couponId })
            .getRawOne();

            const UniqueUsers = Number(UniqueUserResult.uniqueUsers) || 0;

        const totalDiscountResult = await this.couponRedemptionRepository
            .createQueryBuilder('redemption')
            .select('SUM(redemption.discountAmount)', 'totalDiscount')
            .where('redemption.couponId = :couponId', { couponId })
            .getRawOne();

            const totalDiscountGiven = Number(totalDiscountResult.totalDiscount) || 0;


        return {
            couponId,
            totalUses,
            UniqueUsers,
            totalDiscountGiven,
        };
        



    }

}
