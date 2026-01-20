import { Module } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CouponsController } from './coupons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from './coupon.entity';
import { AdminCouponsService } from './admin/admin-coupons.service';
import { AdminCouponsController } from './admin/admin-coupons.controller';
   
@Module({
  imports: [
    TypeOrmModule.forFeature([Coupon,  ]),
     
  ],
  providers: [
    CouponsService,
    AdminCouponsService,
   ],
  controllers: [
    CouponsController,
    AdminCouponsController,
   ],
  exports: [CouponsService],
})
export class CouponsModule {}
