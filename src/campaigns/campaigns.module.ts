import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { campaign } from './campaign.entity';
import { CampaignsService } from './campaigns.service';
import { CampaignsController } from './campaigns.controller';
import { ShippingCampaignController } from '../shipping_campaign/shipping_campaign.controller';
import { ShippingCampaignModule } from '../shipping_campaign/shipping_campaign.module';

@Module({
    imports: [TypeOrmModule.forFeature([campaign]), ShippingCampaignModule],
    providers: [CampaignsService, ],
    controllers: [CampaignsController, ShippingCampaignController],
    exports: [CampaignsService]

})
export class CampaignsModule {}
