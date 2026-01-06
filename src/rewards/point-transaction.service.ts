import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, ManyToMany } from 'typeorm';
import {
  PointTransaction,
  PointTransactionSource,
  PointTransactionType,
} from './point-transaction.entity';
import { WalletService } from './wallet.service';
import { Wallet } from './wallet.entity';

@Injectable()
export class PointTransactionService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly transactionRepository: Repository<PointTransaction>,
    private readonly walletService: WalletService,
    private readonly dataSource: DataSource,
  ) {}

  async earnPoints(params: {
    userId: number;
    points: number;
    source: PointTransactionSource;
    referenceId?: number;
    metadata?: Record<string, any>;
  }) {

    const {userId, points, source, referenceId, metadata} = params;

    if (points <= 0) {
        throw new BadRequestException("Points must be positive!")
    }

    return this.dataSource.transaction(async (manager) => {
        const transaction = manager.create(PointTransaction, {
            userId,
            type: PointTransactionType.EARN,
            points,
            source,
            referenceId,
            metadata,
        });
        await manager.save(transaction)
        await this.walletService.createWalletForUser(userId);

        return transaction;
    })
  }

   async redeemPoints(params: {
    userId: number;
    points: number;
    source: PointTransactionSource;
    referenceId?: number;
    metadata?: Record<string, any>;
  }) {
        const {userId, points, source, referenceId, metadata} = params;

        if (points <= 0) {
            throw new BadRequestException("Points must be positive!")
        }

        return this.dataSource.transaction(async (manager) => {
           
            await this.walletService.debitPoints(userId, points);

            const transaction = manager.create(PointTransaction, {
                userId,
                points: -points,
                type: PointTransactionType.REDEEM,
                source,
                referenceId,
                metadata,
            });
            await manager.save(transaction)
            return transaction;

                

        });

            

    }


    async expirePoints(params: {
      userId: number;
      points: number;
      referenceId?: number;    
    }) {
      const {userId, points, referenceId} = params;
      
      if(points <= 0) {
        throw new BadRequestException("Points must be positive!")
      
      }

      return this.dataSource.transaction(async (manager) => {
        await this.walletService.debitPoints(userId, points);

        const transaction = manager.create(PointTransaction, {
          userId,
          points: -points,
          type: PointTransactionType.EXPIRE,
          source: PointTransactionSource.ADMIN,
          referenceId,
        });
        await manager.save(transaction)
        return transaction;
      })

      



    }


    async adjustPoints(
      params: {
        userId: number;
        points: number;
        referenceId?: number;
        metadata?: Record<string, any>;

      }
    ) {
      const {userId, points, referenceId, metadata} = params;

if (points <= 0) {
  throw new BadRequestException("Points must be positive!")

}

return this.dataSource.transaction(async (manager) => {
  if (points > 0) {
    await this.walletService.creditPoints(userId, points);
  } else {
    await this.walletService.debitPoints(userId, Math.abs(points));
  }  

  const transaction = manager.create(PointTransaction, {
    userId,
    points: -points,
    type: PointTransactionType.ADJUST,
    source: PointTransactionSource.ADMIN,
    referenceId,
    metadata,
  });
  await manager.save(transaction)
  return transaction;
})
    }

}
