import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from 'src/rewards/wallet.entity';
import { RewardsController } from './rewards.controller';
import { WalletService } from './wallet.service';
import { PointTransaction } from './point-transaction.entity';
import { PointTransactionService } from './point-transaction.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet, PointTransaction])],
  controllers: [RewardsController],
  providers: [WalletService, PointTransactionService  ],
  exports: [WalletService, PointTransactionService],
})
export class RewardsModule {}
