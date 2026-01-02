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
import { Wallet } from 'src/rewards/wallet.entity';
import { RewardsModule } from 'src/rewards/rewards.module';
import { RewardsService } from 'src/rewards/rewards.service';
import { RewardsController } from 'src/rewards/rewards.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature([Coupon, CouponRedemption, Wallet]),
    CouponAnalyticsModule,
  ],
  providers: [
    CouponsService,
    AdminCouponsService,
    CouponRedemptionService,
    CouponAnalyticsService,
    RewardsService,

  ],
  controllers: [
    CouponsController,
    AdminCouponsController,
    CouponAnalyticsController,
    RewardsController
  ],
  exports: [CouponsService],
})
export class CouponsModule {}
