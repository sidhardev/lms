import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponRedemption } from '../redemptions/coupon-redemption.entity';
import { CouponRedemptionService } from '../redemptions/coupon-redemption.service';


@Module({
    imports: [TypeOrmModule.forFeature([CouponRedemption])],
    providers: [CouponRedemptionService],
    exports: [CouponRedemptionService],
})
export class CouponRedemptionModule {}
