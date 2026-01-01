import { Module } from '@nestjs/common';
import { AdminService } from './admin-coupon.service';

@Module({
  providers: [AdminService]
})
export class AdminModule {}
