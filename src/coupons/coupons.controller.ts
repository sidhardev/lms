import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApplyCouponDto } from './dtos/apply-coupon.dto';
import { CouponsService } from './coupons.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ConfirmCouponDto } from './dtos/confirm-copon.dto';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('coupons')
export class CouponsController {
  constructor(private couponService: CouponsService) {}
  @Post('apply')
  applyCoupon(@Body() applyCouponDto: ApplyCouponDto, @Req() req: any) {
    return this.couponService.applyCoupon(applyCouponDto, req.user.id);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post('confirm')
  confirmCoupon(@Body() confirmCouponDto: ConfirmCouponDto, @Req() req: any) {
    return this.couponService.confirmCoupon(confirmCouponDto, req.user.id);
  }
}
