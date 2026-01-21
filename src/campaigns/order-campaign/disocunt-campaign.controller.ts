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
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AdminGuard } from 'src/auth/guards/admin-guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CampaignsService } from './disocunt-campaign.service';
import { CreateCampaignDto } from './dtos/create-campaign.dto';
import { UpdateCampaignStatusDto } from './dtos/update-campaign-status.dto';
import {
  CampaignStatus,
  DiscountType,
} from './entites/discount-campaign.entity';
import { ShippingCampaignService } from '../shipping_campaign/shipping_campaign.service';
import { CreateFreeShippingDto } from '../shipping_campaign/free_shipping.dto';
import { LoyaltyProgram } from '../loyalty-program/entities/loyalty-program.entity';
import { CreateLoyaltyProgramDto } from '../loyalty-program/dtos/create-loyalty-program.dto';
import { LoyaltyProgramService } from '../loyalty-program/loyalty-program.service';
import { BrandDiscountDto } from './rules/dtos/brand-discount.dto';
import { ProductDiscountDto } from './rules/dtos/product-discount.dto';
import { CategoryDiscountDto } from './rules/dtos/category-discount.dto';
import { BulkPurchaseDto } from './rules/dtos/bulk-purchase.dto';
import { CartCustomTotalDto } from './rules/dtos/cart-total-custom.dto';
import { wholeCartDto } from './rules/dtos/whole-cart.dto';
import { PointsPerRupeeDto } from '../loyalty-program/dtos/points-per-ruppee.dto';
import { FirstPurchasePointsDto } from '../loyalty-program/dtos/first_purchase.dto';
import { DailyLoginStreakDto } from '../loyalty-program/dtos/daily-streak-login.dto';
import { CategoryBasedDto } from '../loyalty-program/dtos/category-based.dto';
import { updateCampaignDto } from './dtos/update-order-campaign.dto';

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
    CategoryDiscountDto,
    ProductDiscountDto,
    BrandDiscountDto,
    PointsPerRupeeDto,
    FirstPurchasePointsDto,
    DailyLoginStreakDto,
    CategoryBasedDto,
  )
  @Post('campaigns/discount-coupon/create')
  create(@Body() dto: CreateCampaignDto) {
    switch (dto.discountType) {
      case DiscountType.FREE_SHIPPING:
        return this.shippingService.create(dto);

      case DiscountType.ORDER_DISCOUNT:
        return this.campaignService.createDiscountCoupon(dto);
    }
  }

  @Post('campaigns/loyaltyprogram/create')
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
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  get(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.campaignService.findAll(page, limit);
  }

  @Get('campaigns/discount-coupon/active')
  findActive() {
    return this.campaignService.findActive();
  }

  @Patch('campaigns/discount-coupon/:id/status')
  @ApiOperation({ summary: 'Change status of campaign' })
  @ApiParam({ name: 'id', type: Number })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStatusDto: UpdateCampaignStatusDto,
  ) {
    return this.campaignService.UpdateStatus(id, updateStatusDto);
  }

  @Delete('campaigns/coupon/:id')
  deleteById(@Param('id') id: number) {
    return this.campaignService.deleteById(id);
  }
}
