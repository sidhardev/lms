import { Body, Controller, Get, Post } from '@nestjs/common';
import { ShippingCampaignService } from './shipping_campaign.service';
import { CreateFreeShippingDto } from './free_shipping.dto';

@Controller('shipping-campaign')
export class ShippingCampaignController {
  constructor(private readonly shippingService: ShippingCampaignService) {}

  @Post('/create')
  create(@Body() dto: CreateFreeShippingDto) {
    return this.shippingService.create(dto);
  }

  @Get('/shipping')
  findAll() {
    return this.shippingService.findAll();
  }
}
