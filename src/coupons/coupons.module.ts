import { Module } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CouponsController } from './coupons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from './coupon.entity';
import { AdminCouponsService } from './admin/admin-coupons.service';
import { AdminCouponsController } from './admin/admin-coupons.controller';
import { CouponRedemptionService } from './redemptions/coupon-redemption.service';
import { CouponRedemption } from './redemptions/coupon-redemption.entity';
import { AnalyticsService } from './analytics/analytics.service';
import { AnalyticsController } from './analytics/analytics.controller';
import { \analytics\Module } from './analytics/analytics/.module';
import { AnalyticsModule } from './analytics/analytics.module';


@Module({

  imports: [TypeOrmModule.forFeature([Coupon, CouponRedemption]), \analytics\Module, AnalyticsModule],
  providers: [CouponsService, AdminCouponsService, CouponRedemptionService, AnalyticsService],
  controllers: [CouponsController, AdminCouponsController, AnalyticsController],
  exports: [CouponsService],
})
export class CouponsModule {}
