import { Module } from '@nestjs/common';
import { ShippingCampaignService } from './shipping_campaign.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { campaign } from 'src/campaigns/order-campaign/entites/discount-campaign.entity';
import { ShippingCampaignController } from './shipping_campaign.controller';
import { CampaignEntityModule } from '../campaigns.module';
import { Campaigns } from '../campaign.entity';
import { CampaignNotification } from 'src/notifications/entities/notification.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([campaign, Campaigns, CampaignNotification]),
    CampaignEntityModule,
  ],
  providers: [ShippingCampaignService],
  controllers: [ShippingCampaignController],
  exports: [ShippingCampaignService],
})
export class ShippingCampaignModule {}
