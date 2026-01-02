import { Module } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CouponsController } from './coupons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from './coupon.entity';
import { AdminCouponsService } from './admin/admin-coupons.service';
import { AdminCouponsController } from './admin/admin-coupons.controller';
import { CouponRedemptionService } from './redemptions/coupon-redemption.service';
import { CouponRedemption } from './redemptions/coupon-redemption.entity';
import { CouponAnalyticsController } from './analytics/coupon-analytics.controller';
import { CouponAnalyticsModule } from './analytics/coupon-analytics.module';
import { CouponAnalyticsService } from './analytics/coupon-analytics.service';



@Module({

  imports: [TypeOrmModule.forFeature([Coupon, CouponRedemption]), CouponAnalyticsModule],
  providers: [CouponsService, AdminCouponsService, CouponRedemptionService, CouponAnalyticsService],
  controllers: [CouponsController, AdminCouponsController, CouponAnalyticsController],
  exports: [CouponsService],
})
export class CouponsModule {}
