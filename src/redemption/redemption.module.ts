import { Module } from '@nestjs/common';
import { RedemptionService } from './redemption.service';

@Module({
  providers: [RedemptionService]
})
export class RedemptionModule {}
