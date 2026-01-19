import { Module } from '@nestjs/common';
import { ShippingCampaignService } from './shipping_campaign.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { campaign } from 'src/campaigns/order-campaign/campaign.entity';
import { ShippingCampaignController } from './shipping_campaign.controller';

@Module({
  imports: [TypeOrmModule.forFeature([campaign])],
  providers: [ShippingCampaignService],
  controllers: [ShippingCampaignController],
  exports: [ShippingCampaignService],
})
export class ShippingCampaignModule {}
