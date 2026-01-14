import { Module } from '@nestjs/common';
import { LoyaltyProgramService } from './loyalty-program.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoyaltyProgram } from './loyalty-program.entity';

@Module({
  providers: [LoyaltyProgramService],
  imports: [TypeOrmModule.forFeature([LoyaltyProgram])],
  exports: [LoyaltyProgramService],
})
export class LoyaltyProgramModule {}
