import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { campaign } from './entites/discount-campaign.entity';
import { CampaignsService } from './disocunt-campaign.service';
import { CampaignsController } from './disocunt-campaign.controller';
import { ShippingCampaignModule } from '../shipping_campaign/shipping_campaign.module';
import { WholeCart } from './entites/whole-cart.entity';
import { BulkPurchase } from './entites/bulk-purchase.entity';
import { LoyaltyProgramModule } from 'src/campaigns/loyalty-program/loyalty-program.module';
import { Campaigns } from '../campaign.entity';
import { CampaignNotification } from 'src/notifications/entities/notification.entity';
import { CartCustomTotal } from './entites/cart-total-custom.entity';
import { categoryDiscount } from './entites/category-discount.entity';
import { ProductDiscount } from './entites/product-discount.entity';
import { BrandDiscount } from './entites/brand-discount.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      campaign,
      WholeCart,
      BulkPurchase,
      Campaigns,
      CampaignNotification,
      CartCustomTotal,
      categoryDiscount,
      ProductDiscount,
      BrandDiscount,
    ]),
    ShippingCampaignModule,
    LoyaltyProgramModule,
  ],
  providers: [CampaignsService],
  controllers: [CampaignsController],
  exports: [CampaignsService],
})
export class CampaignsModule {}
