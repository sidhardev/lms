import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { PointTransactionService } from 'src/rewards/point-transaction.service';
import { PointTransaction } from 'src/rewards/point-transaction.entity';
import { WalletService } from 'src/rewards/wallet.service';

import { Wallet } from 'src/rewards/wallet.entity';
import { RewardsModule } from 'src/rewards/rewards.module';
@Module({
  providers: [OrdersService, PointTransactionService, WalletService],
  imports: [TypeOrmModule.forFeature([Order, PointTransaction, Wallet]), RewardsModule],
  exports: [OrdersService],
  
})
export class OrdersModule {}
