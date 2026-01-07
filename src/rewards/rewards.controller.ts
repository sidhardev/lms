import { Controller, Body, Post, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { WalletService } from './wallet.service';
import { PointTransactionService } from './point-transaction.service';
import { PointTransactionType, PointTransactionSource } from './point-transaction.entity';
import { AdminGuard } from 'src/auth/guards/admin-guard';
import { ApplyRewardDto } from './dtos/apply-reward.dto';
import { ConfirmRewardDto } from './dtos/confirm-reward.dto';


@Controller('rewards')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class RewardsController {
    constructor(
    private readonly walletService: WalletService,
    private readonly pointTransactionService: PointTransactionService,
  ) {}


  @Get('wallet')
  async getWallet(@Req() req) {
    const { userId } = req.user.id;
    return this.walletService.getWalletByUserId(userId);
  }


  @Post('confirm')
async confirmReward(
  @Req() req,
  @Body() dto: ConfirmRewardDto,
) {
  return this.pointTransactionService.confirmRewardRedemption({
    userId: req.user.id,
    orderId: dto.orderId,
    redeemPoints: dto.redeemPoints,
  });
}



@Post('apply')
async applyReward(@Req() req, @Body() dto: ApplyRewardDto) {
  return this.pointTransactionService.previewRewardDiscount({
    userId: req.user.userId,
    orderAmount: dto.orderAmount,
    redeemPoints: dto.redeemPoints,
  });
}







}
