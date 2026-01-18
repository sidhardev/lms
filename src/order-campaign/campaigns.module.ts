import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { campaign } from './campaign.entity';
import { CampaignsService } from './campaigns.service';
import { CampaignsController } from './campaigns.controller';
import { ShippingCampaignController } from '../shipping_campaign/shipping_campaign.controller';
import { ShippingCampaignModule } from '../shipping_campaign/shipping_campaign.module';
import { WholeCart } from './rules/entites/whole-cart.entity';
import { BulkPurchase } from './rules/entites/bulk-purchase.entity';
import { CategoryDiscount } from './rules/entites/category-discount.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([campaign, WholeCart, BulkPurchase, CategoryDiscount]),
    ShippingCampaignModule,
  ],
  providers: [CampaignsService],
  controllers: [CampaignsController, ShippingCampaignController],
  exports: [CampaignsService],
})
export class CampaignsModule {}
