import { Body, Controller, Post } from '@nestjs/common';
import { ApplyCouponDto } from './dtos/apply-coupon.dto';
import { CouponsService } from './coupons.service';

@Controller('coupons')
export class CouponsController {
    constructor(private couponService: CouponsService) {}
    @Post('apply')
    applyCoupon(@Body() applyCouponDto: ApplyCouponDto) {
        return this.couponService.applyOrderDiscount(applyCouponDto);
}
}
