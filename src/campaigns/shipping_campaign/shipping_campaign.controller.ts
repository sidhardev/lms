import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ShippingCampaignService } from './shipping_campaign.service';
import { CreateFreeShippingDto } from './free_shipping.dto';

@Controller('shipping-campaign')
export class ShippingCampaignController {
  constructor(private readonly shippingService: ShippingCampaignService) {}

  // @Post('/create')
  // create(@Body() dto: CreateFreeShippingDto) {
  //   return this.shippingService.create(dto);
  // }

  // @Get('/shipping')
  findAll() {
    return this.shippingService.findAll();
  }

  // @Patch(':id/status')
  updateStatus(@Param('id', ParseIntPipe) id: number) {
    return this.shippingService.UpdateStatus(id);
  }

  // @Delete(':id')
  deleteById(@Param('id') id: number) {
    return this.shippingService.deleteById(id);
  }
}
