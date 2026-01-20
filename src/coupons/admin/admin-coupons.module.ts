import { Module } from '@nestjs/common';
import { AdminCouponsService } from './admin-coupons.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from '../coupon.entity';
import { AdminCouponsController } from './admin-coupons.controller';
import { CouponAnalyticsService } from '../analytics/coupon-analytics.service';
import { CouponAnalyticsController } from '../analytics/coupon-analytics.controller';
import { CouponRedemption } from '../redemptions/coupon-redemption.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coupon, CouponRedemption])],
  controllers: [AdminCouponsController],
  providers: [AdminCouponsService, CouponAnalyticsService],
  exports: [AdminCouponsService],
})
export class AdminModule {}
