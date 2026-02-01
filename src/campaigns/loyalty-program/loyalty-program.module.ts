import { Module } from '@nestjs/common';
import { LoyaltyProgramService } from './loyalty-program.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoyaltyProgram } from './entities/loyalty-program.entity';
import { PointsPerRupee } from './entities/points-per-rupee.entity';
import { FirstPurchase } from './entities/first-purchase.entity';
import { DailyLoginStreak } from './entities/daily-login-streak.entity';
import { CategoryBased } from './entities/category-based.entity';
import { CampaignEntityModule } from '../campaigns.module';
import { Campaigns } from '../campaign.entity';
import { CampaignNotification } from 'src/notifications/entities/notification.entity';

@Module({
  providers: [LoyaltyProgramService],
  imports: [
    TypeOrmModule.forFeature([
      LoyaltyProgram,
      PointsPerRupee,
      FirstPurchase,
      DailyLoginStreak,
      CategoryBased,
      Campaigns,
      CampaignNotification,
    ]),
    CampaignEntityModule,
  ],
  exports: [LoyaltyProgramService],
})
export class LoyaltyProgramModule {}
