import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { campaign } from './entites/discount-campaign.entity';
import { CampaignsService } from './disocunt-campaign.service';
import { CampaignsController } from './disocunt-campaign.controller';
// import { ShippingCampaignController } from '../shipping_campaign/shipping_campaign.controller';
import { ShippingCampaignModule } from '../shipping_campaign/shipping_campaign.module';
import { WholeCart } from './entites/whole-cart.entity';
import { BulkPurchase } from './entites/bulk-purchase.entity';
import { CategoryDiscount } from './entites/category-discount.entity';
import { LoyaltyProgramModule } from 'src/campaigns/loyalty-program/loyalty-program.module';
import { Campaigns } from '../campaign.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      campaign,
      WholeCart,
      BulkPurchase,
      CategoryDiscount,
      Campaigns,
    ]),
    ShippingCampaignModule,
    LoyaltyProgramModule,
  ],
  providers: [CampaignsService],
  controllers: [CampaignsController /*, ShippingCampaignController */],
  exports: [CampaignsService],
})
export class CampaignsModule {}
