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
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/auth/guards/admin-guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CampaignsService } from './disocunt-campaign.service';
import { CreateCampaignDto } from './dtos/create-campaign.dto';
import { UpdateCampaignStatusDto } from './dtos/update-campaign-status.dto';
import { CampaignStatus, DiscountType } from './discount-campaign.entity';
import { ShippingCampaignService } from '../shipping_campaign/shipping_campaign.service';
import { CreateFreeShippingDto } from '../shipping_campaign/free_shipping.dto';

@Controller()
// @UseGuards(JwtAuthGuard, AdminGuard)
// @ApiBearerAuth('access-token')
export class CampaignsController {
  constructor(private readonly campaignService: CampaignsService, private readonly shippingService: ShippingCampaignService) {}
  @Post('campaigns/discount-coupon/create')
  create(@Body() dto: CreateCampaignDto) {
    switch(dto.discountType) {
      case DiscountType.FREE_SHIPPING :
        return this.shippingService.create(dto);
   

    case DiscountType.ORDER_DISCOUNT :
    return this.campaignService.createDiscountCoupon(dto);
    }
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
  updateStatus(@Param('id', ParseIntPipe) id: number) {
    return this.campaignService.UpdateStatus(id);
  }

  @Delete('campaigns/discocunt-coupon/:id')
  deleteById(@Param('id') id: number) {
    return this.campaignService.deleteById(id);
  }
}
