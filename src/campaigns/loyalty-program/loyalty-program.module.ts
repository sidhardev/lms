import { Module } from '@nestjs/common';
import { LoyaltyProgramService } from './loyalty-program.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoyaltyProgram } from './loyalty-program.entity';
import { PointsPerRupee } from './points-per-rupee.entity';
import { FirstPurchase } from './first-purchase.entity';
import { DailyLoginStreak } from './daily-login-streak.entity';
import { CategoryBased } from './category-based.entity';


@Module({
  providers: [LoyaltyProgramService],
  imports: [TypeOrmModule.forFeature([
    LoyaltyProgram,
    PointsPerRupee,
    FirstPurchase,
    DailyLoginStreak,
    CategoryBased
  ])],
  exports: [LoyaltyProgramService],
})
export class LoyaltyProgramModule {}
