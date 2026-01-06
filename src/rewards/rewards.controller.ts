import { Controller, Body, Post, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { WalletService } from './wallet.service';
import { PointTransactionService } from './point-transaction.service';
import { PointTransactionType, PointTransactionSource } from './point-transaction.entity';
import { AdminGuard } from 'src/auth/guards/admin-guard';


@Controller('rewards')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, AdminGuard)
export class RewardsController {
    constructor(
    private readonly walletService: WalletService,
    private readonly pointTransactionService: PointTransactionService,
  ) {}


  @Get('wallet')
  async getWallet(@Req() req) {
    const { userId } = req.user;
    return this.walletService.getWalletByUserId(userId);
  }


  @Post('redeem')
async redeemPoints(@Req() req, @Body() body) {
  const { points } = body;
  const { userId } = req.user;

  return this.pointTransactionService.redeemPoints({
    userId,
    points,
    source: PointTransactionSource.GIFT,
    referenceId: body.referenceId,
    metadata: {
        redeemedVia: 'REWARD_BASED_DISCOUNT'
    },
  });
}







}
