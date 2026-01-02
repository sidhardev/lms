import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from 'src/rewards/wallet.entity';
import { RewardsController } from './rewards.controller';
import { RewardsService } from './rewards.service';

@Module({
    imports: [TypeOrmModule.forFeature([Wallet])],
  controllers: [RewardsController],
  providers: [RewardsService],
  exports: [],
})
export class RewardsModule {}
