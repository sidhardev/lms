import { Module } from '@nestjs/common';
import { LoyaltyProgramService } from './loyalty-program.service';

@Module({
  providers: [LoyaltyProgramService]
})
export class LoyaltyProgramModule {}
