import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { CampaignsService } from './discount-campaign.service';
import { CreateCampaignDto } from './dtos/create-campaign.dto';
import {
  CampaignStatus,
  DiscountType,
} from './entites/discount-campaign.entity';
import { ShippingCampaignService } from '../shipping_campaign/shipping_campaign.service';
import { LoyaltyProgram } from '../loyalty-program/entities/loyalty-program.entity';
import { CreateLoyaltyProgramDto } from '../loyalty-program/dtos/create-loyalty-program.dto';
import { LoyaltyProgramService } from '../loyalty-program/loyalty-program.service';
import { BulkPurchaseDto } from './rules/dtos/bulk-purchase.dto';
import { CartCustomTotalDto } from './rules/dtos/cart-total-custom.dto';
import { wholeCartDto } from './rules/dtos/whole-cart.dto';
import { PointsPerRupeeDto } from '../loyalty-program/dtos/points-per-ruppee.dto';
import { FirstPurchasePointsDto } from '../loyalty-program/dtos/first_purchase.dto';
import { DailyLoginStreakDto } from '../loyalty-program/dtos/daily-streak-login.dto';
import { CategoryBasedDto } from '../loyalty-program/dtos/category-based.dto';

@Controller()
// @UseGuards(JwtAuthGuard, AdminGuard)
// @ApiBearerAuth('access-token')
export class CampaignsController {
  constructor(
    private readonly campaignService: CampaignsService,
    private readonly shippingService: ShippingCampaignService,
    private readonly loyaltyProgramService: LoyaltyProgramService,
  ) {}

  @ApiExtraModels(
    wholeCartDto,
    CartCustomTotalDto,
    BulkPurchaseDto,
    PointsPerRupeeDto,
    FirstPurchasePointsDto,
    DailyLoginStreakDto,
    CategoryBasedDto,
  )
  @Post('campaigns/discount-coupon/create')
  @ApiOperation({ summary: 'Create discount Coupon campaign' })
  create(@Body() dto: CreateCampaignDto) {
    switch (dto.discountType) {
      case DiscountType.FREE_SHIPPING:
        return this.shippingService.create(dto);

      case DiscountType.ORDER_DISCOUNT:
        return this.campaignService.createDiscountCoupon(dto);
    }
  }

  @Post('campaigns/loyaltyprogram/create')
  @ApiOperation({ summary: 'Create loyalty program' })
  @ApiCreatedResponse({
    description: 'Loyalty program created successfully',
    type: LoyaltyProgram,
  })
  async createloyalty(
    @Body() createLoyaltyProgramDto: CreateLoyaltyProgramDto,
  ): Promise<LoyaltyProgram> {
    return this.loyaltyProgramService.create(createLoyaltyProgramDto);
  }
  @Get('campaigns/get')
  @ApiOperation({ summary: 'Get all campaigns' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  get(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.campaignService.findAll(page, limit);
  }

  @Get('campaigns/discount-coupon/active')
  @ApiOperation({ summary: 'Get active campaigns' })
  findActive() {
    return this.campaignService.findActive();
  }

  @Patch('campaigns/discount-coupon/:id/status')
  @ApiOperation({ summary: 'Change status of campaign' })
  @ApiParam({ name: 'id', type: Number })
  @ApiQuery({
    name: 'status',
    enum: CampaignStatus,
    description: 'Choose the new status for the campaign',
  })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Query('status') status: CampaignStatus,
  ) {
    return this.campaignService.UpdateStatus(id, status);
  }

  @Delete('campaigns/:id')
  deleteById(@Param('id') id: number) {
    return this.campaignService.deleteById(id);
  }
}
