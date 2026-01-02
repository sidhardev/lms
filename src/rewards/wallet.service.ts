import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from 'src/rewards/wallet.entity';





@Injectable()
export class WalletService {

    constructor(@InjectRepository(Wallet) private readonly walletRepository: Repository<Wallet>) {}

    async createWalletForUser(userId: number): Promise<Wallet> {
        const existingWallet = await this.walletRepository.findOne({ where: { userId } });
if (existingWallet) {
    return existingWallet;

}

    const wallet = this.walletRepository.create({ userId, totalPoints: 0, availablePoints: 0});
    return this.walletRepository.save(wallet);


    }

    async getWalletByUserId(userId: number): Promise<Wallet> {
        const wallet = await this.walletRepository.findOne({ where: { userId } });
        if (!wallet) {
            throw new NotFoundException('Wallet not found for the user.');
        }
        return wallet;

   }


   async creditPoints(userId: number, points: number): Promise<Wallet> {
    const wallet = await this.walletRepository.findOne({ where: { userId } });

    if (!wallet) {
        throw new NotFoundException('Wallet not found for the user.');
    }
    if (points >= 0) {
        throw new BadRequestException("Points to credit must be positive!")
    }

    wallet.totalPoints += points;
    wallet.availablePoints += points;

    return this.walletRepository.save(wallet);
}
 async debitPoints(
    userId: number,
    points: number,
  ): Promise<Wallet> {
    if (points <= 0) {
      throw new BadRequestException(
        'Points to debit must be positive',
      );
    }

    const wallet = await this.getWalletByUserId(userId);

    if (wallet.availablePoints < points) {
      throw new BadRequestException(
        'Insufficient reward balance',
      );
    }

    wallet.availablePoints -= points;

    return this.walletRepository.save(wallet);
  }



}
