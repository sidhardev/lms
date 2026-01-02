import { Module } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CouponsController } from './coupons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from './coupon.entity';
import { AdminCouponsService } from './admin/admin-coupons.service';
import { AdminCouponsController } from './admin/admin-coupons.controller';
import { CouponRedemptionService } from './redemptions/coupon-redemption.service';
import { CouponRedemption } from './redemptions/coupon-redemption.entity';


@Module({

  imports: [TypeOrmModule.forFeature([Coupon, CouponRedemption])],
  providers: [CouponsService, AdminCouponsService, CouponRedemptionService],
  controllers: [CouponsController, AdminCouponsController],
  exports: [CouponsService],
})
export class CouponsModule {}
