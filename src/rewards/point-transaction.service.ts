// import { Injectable, BadRequestException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository, DataSource } from 'typeorm';
// import {
//   PointTransaction,
//   PointTransactionSource,
//   PointTransactionType,
// } from './point-transaction.entity';
// import { WalletService } from './wallet.service';

// @Injectable()
// export class PointTransactionService {
//   constructor(
//     @InjectRepository(PointTransaction)
//     private readonly transactionRepository: Repository<PointTransaction>,
//     private readonly walletService: WalletService,
//     private readonly dataSource: DataSource,
//   ) {}

//   async earnPoints(params: {
//     userId: number;
//     points: number;
//     source: PointTransactionSource;
//     referenceId?: number;
//     metadata?: Record<string, any>;
//   }) {
//     const { userId, points, source, referenceId, metadata } = params;

//     if (points <= 0) {
//       throw new BadRequestException('Points must be positive');
//     }

//     return this.dataSource.transaction(async (manager) => {
//       await this.walletService.creditPoints(userId, points);

//       const transaction = manager.create(PointTransaction, {
//         user: { id: userId } as any,
//         points,
//         type: PointTransactionType.EARN,
//         source,
//         referenceId,
//         metadata,
//       });

//       await manager.save(transaction);
//       return transaction;
//     });
//   }

//   async redeemPoints(params: {
//     userId: number;
//     points: number;
//     source: PointTransactionSource;
//     referenceId?: number;
//     metadata?: Record<string, any>;
//   }) {
//     const { userId, points, source, referenceId, metadata } = params;

//     if (points <= 0) {
//       throw new BadRequestException('Points must be positive');
//     }

//     return this.dataSource.transaction(async (manager) => {
//       await this.walletService.debitPoints(userId, points);

//       const transaction = manager.create(PointTransaction, {
//         user: { id: userId } as any,
//         points: -points,
//         type: PointTransactionType.REDEEM,
//         source,
//         referenceId,
//         metadata,
//       });

//       await manager.save(transaction);
//       return transaction;
//     });
//   }

//   async expirePoints(params: {
//     userId: number;
//     points: number;
//     referenceId?: number;
//   }) {
//     const { userId, points, referenceId } = params;

//     if (points <= 0) {
//       throw new BadRequestException('Points must be positive');
//     }

//     return this.dataSource.transaction(async (manager) => {
//       await this.walletService.debitPoints(userId, points);

//       const transaction = manager.create(PointTransaction, {
//         user: { id: userId } as any,
//         points: -points,
//         type: PointTransactionType.EXPIRE,
//         source: PointTransactionSource.ADMIN,
//         referenceId,
//       });

//       await manager.save(transaction);
//       return transaction;
//     });
//   }

//   async adjustPoints(params: {
//     userId: number;
//     points: number;
//     referenceId?: number;
//     metadata?: Record<string, any>;
//   }) {
//     const { userId, points, referenceId, metadata } = params;

//     if (points === 0) {
//       throw new BadRequestException('Points cannot be zero');
//     }

//     return this.dataSource.transaction(async (manager) => {
//       if (points > 0) {
//         await this.walletService.creditPoints(userId, points);
//       } else {
//         await this.walletService.debitPoints(userId, Math.abs(points));
//       }

//       const transaction = manager.create(PointTransaction, {
//         user: { id: userId } as any,
//         points,
//         type: PointTransactionType.ADJUST,
//         source: PointTransactionSource.ADMIN,
//         referenceId,
//         metadata,
//       });

//       await manager.save(transaction);
//       return transaction;
//     });
//   }

//   async previewRewardDiscount(params: {
//     userId: number;
//     orderAmount: number;
//     redeemPoints?: number;
//   }) {
//     const { userId, orderAmount, redeemPoints } = params;

//     const wallet = await this.walletService.getWalletByUserId(userId);

//     if (wallet.availablePoints <= 0) {
//       return {
//         canApply: false,
//         reason: 'No rewards available',
//       };
//     }

//     const maxRedeemablePoints = Math.min(wallet.availablePoints, orderAmount);

//     const safePoints = Math.min(
//       redeemPoints ?? maxRedeemablePoints,
//       wallet.availablePoints,
//       orderAmount,
//     );

//     if (safePoints <= 0) {
//       return {
//         canApply: false,
//         reason: 'Insufficient balance',
//       };
//     }

//     return {
//       canApply: true,
//       availablePoints: wallet.availablePoints,
//       redeemablePoints: safePoints,
//       discountAmount: safePoints,
//       finalPayable: orderAmount - safePoints,
//       message: 'Reward discount applied (preview)',
//     };
//   }

//   async confirmRewardRedemption(params: {
//     userId: number;
//     orderId: number;
//     redeemPoints: number;
//   }) {
//     const { userId, orderId, redeemPoints } = params;

//     if (redeemPoints <= 0) {
//       throw new BadRequestException('Points must be positive');
//     }

//     return this.dataSource.transaction(async (manager) => {
//       await this.walletService.debitPoints(userId, redeemPoints);

//       const transaction = manager.create(PointTransaction, {
//         user: { id: userId } as any,
//         points: -redeemPoints,
//         type: PointTransactionType.REDEEM,
//         source: PointTransactionSource.ORDER,
//         referenceId: orderId,
//         metadata: {
//           redeemedFor: 'ORDER_DISCOUNT',
//           orderId,
//         },
//       });

//       await manager.save(transaction);

//       return {
//         status: true,
//         redeemedPoints: redeemPoints,
//       };
//     });
//   }
// }
