import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from 'src/rewards/wallet.entity';
import { RewardsController } from './rewards.controller';
import { WalletService } from './wallet.service';

@Module({
    imports: [TypeOrmModule.forFeature([Wallet])],
  controllers: [RewardsController],
  providers: [WalletService],
  exports: [WalletService],
})
export class RewardsModule {}
