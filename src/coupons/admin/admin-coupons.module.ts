import { Module } from '@nestjs/common';
import { AdminCouponsService } from './admin-coupons.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from '../coupon.entity';
import { AdminCouponsController } from './admin-coupons.controller';
 
@Module({
  imports: [TypeOrmModule.forFeature([Coupon,  ])],
  controllers: [AdminCouponsController],
  providers: [AdminCouponsService,  ],
  exports: [AdminCouponsService],
})
export class AdminModule {}
