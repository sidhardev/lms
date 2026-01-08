import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AdminCouponsService } from './admin-coupons.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApplyCouponDto } from '../dtos/apply-coupon.dto';
import { UpdateCouponDto } from '../dtos/update-coupon.dto';
import { CreateCouponDto } from '../dtos/create-coupon.dto';
import { AdminGuard } from 'src/auth/guards/admin-guard';
import { CouponAnalyticsService } from '../analytics/coupon-analytics.service';
import { Req } from '@nestjs/common';

@ApiTags('Admin Coupons')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, AdminGuard)
@Controller('admin/coupons')
export class AdminCouponsController {
  constructor(
    private readonly adminCouponsService: AdminCouponsService,
    private readonly couponAnalyticsService: CouponAnalyticsService,
  ) {}

  @Post()
  create(@Body() createCouponDto: CreateCouponDto, @Req() req: any) {
    return this.adminCouponsService.createCoupon(createCouponDto, req);
  }

  @Get()
  findAll() {
    return this.adminCouponsService.findAll();
  }

  @ApiBody({
    type: UpdateCouponDto,
  })


  @Get(':id/analytics')
  async getCouponAnalytics(@Param('id') id: number) {
    return this.couponAnalyticsService.getCouponAnalytics(id);
  }
}
