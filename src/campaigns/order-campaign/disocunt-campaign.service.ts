import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { campaign, CampaignStatus } from './entites/discount-campaign.entity';
import { Repository } from 'typeorm';
import { CreateCampaignDto } from './dtos/create-campaign.dto';

import { RuleType } from './rules/rules.enum';
import { WholeCart } from './entites/whole-cart.entity';
import { BulkPurchase } from './entites/bulk-purchase.entity';
import { Campaigns } from '../campaign.entity';
import { campaignType } from '../enums/campaign-type.enum';
import { CampaignNotification } from 'src/notifications/entities/notification.entity';
import { CartCustomTotal } from './entites/cart-total-custom.entity';
import { categoryDiscount } from './entites/category-discount.entity';
import { ProductDiscount } from './entites/product-discount.entity';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectRepository(campaign)
    private readonly CampaignRepository: Repository<campaign>,
    @InjectRepository(Campaigns)
    private readonly parentCampaignRepository: Repository<Campaigns>,

  ) {}

  async createDiscountCoupon(CreateCampaignDto: CreateCampaignDto) {


  


      const parentCampaign = this.parentCampaignRepository.create({
      name: (CreateCampaignDto as any).name,
      description: (CreateCampaignDto as any).description,
      type: campaignType.DISCOUNT_COUPON,
      startAt: CreateCampaignDto.startAt,
      endAt: CreateCampaignDto.endAt,
      status: CampaignStatus.ACTIVE,
    });
    
   if (CreateCampaignDto.notifications) {
      parentCampaign.notifications = CreateCampaignDto.notifications.map((n) => {
        const notification = new CampaignNotification();
        Object.assign(notification, n);
        return notification;
      });
    }
    const savedParent =
      await this.parentCampaignRepository.save(parentCampaign);

    const campaign = this.CampaignRepository.create({
      useItAsCoupon: CreateCampaignDto.useItAsCoupon,
      discountType: CreateCampaignDto.discountType,
      maxUses: CreateCampaignDto.maxUses,
      ruleType: CreateCampaignDto.ruleType,
      unlimitedUses: CreateCampaignDto.unlimitedUses,
      redemptionType: CreateCampaignDto.redemptionType,
      userEligiblity: CreateCampaignDto.userEligiblity,
      recurringValidity: CreateCampaignDto.recurringValidity,
      recurringCycle: CreateCampaignDto.recurringCycle,
      recurringValidDays: CreateCampaignDto.recurringValidDays,
      recurringStartTime: CreateCampaignDto.recurringStartTime,
      recurringEndTime: CreateCampaignDto.recurringEndTime,
      countries: CreateCampaignDto.countries,
      states: CreateCampaignDto.states,
      cities: CreateCampaignDto.cities,
      campaign: savedParent,
    });


    const dto = CreateCampaignDto;
    if (dto) {
      if (dto.ruleType === RuleType.WHOLE_CART) {
        const wholeCart = new WholeCart();
         wholeCart.discountMode = dto.wholeCart.discountMode;
        wholeCart.discountPercent = dto.wholeCart.discoutPercent;
        wholeCart.discountAmount = dto.wholeCart.discountAmount;
        wholeCart.maxDiscount = dto.wholeCart.MaxDiscount;
        campaign.wholeCart = wholeCart;
      } else if (dto.ruleType === RuleType.BULK_PURCHASE) {
        const bulkPurchase = new BulkPurchase();
         bulkPurchase.discountMode = dto.bulkPurchase.discountMode;
        bulkPurchase.discountPercent =
          dto.bulkPurchase.discountPercent;
        bulkPurchase.discountAmount = dto.bulkPurchase.discountAmount;
        bulkPurchase.minOrderValue = dto.bulkPurchase.minOrderValue;
        bulkPurchase.minItems = dto.bulkPurchase.minItems;
        campaign.bulkPurchase = bulkPurchase;
      } 
      else if (dto.ruleType === RuleType.CART_TOTAL_CUSTOM) {
        const cartTotal = new CartCustomTotal();
         cartTotal.mode = dto.cartTotalCustom.mode;
        cartTotal.minOrderValue = dto.cartTotalCustom.minOrderValue;
        cartTotal.MinPercent = dto.cartTotalCustom.MinPercent;
        cartTotal.MaxPercent = dto.cartTotalCustom.MaxPercent;
        cartTotal.MaxDiscount = dto.cartTotalCustom.MaxDiscount;
        cartTotal.minAmount = dto.cartTotalCustom.minAmount;
        cartTotal.maxAmount = dto.cartTotalCustom.maxAmount;
        

      }
      else if (dto.ruleType === RuleType.CATEGORY_DISCOUNT) {
        if (Array.isArray(dto.categoryDiscount)) {
          campaign.categoryDiscount = dto.categoryDiscount.map(rule => {
            const categoryDiscountRule = new categoryDiscount();
            categoryDiscountRule.name = rule.name;
            categoryDiscountRule.discountPercent = rule.discountPercent;
            categoryDiscountRule.discountAmount = rule.discountAmount;
            categoryDiscountRule.minOrderValue = rule.minOrderValue;
            categoryDiscountRule.maxDiscount = rule.maxDiscount;
             return categoryDiscountRule;
          });
        }
      }

      else if (dto.ruleType === RuleType.PRODUCT_DISCOUNT) {
        if (Array.isArray(dto.productDiscount)) {
          campaign.productDiscount = dto.productDiscount.map(rule => {
            const productDiscountRule = new ProductDiscount();
            productDiscountRule.name = rule.name;
            productDiscountRule.discountPercent = rule.discountPercent;
            productDiscountRule.discountAmount = rule.discountAmount;
            productDiscountRule.minOrderValue = rule.minOrderValue;
            productDiscountRule.maxDiscount = rule.maxDiscount;
             return productDiscountRule;
          });
        }
      }
     
    }

    await this.CampaignRepository.save(campaign);
    return {
      status: true,
      message: "Campaign created Sucessfully",
      parentCampaign
    }
  }

  async findAll(page: number, limit: number) {
    const campaign = await this.parentCampaignRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });

    return campaign;
  }

  findOne(id: number) {
    return this.CampaignRepository.findOne({
      where: { id },
    });
  }

  async UpdateStatus(id: number, updateStatusDto) {
    const campaign = await this.parentCampaignRepository.findOne({
      where: { id: id },
    });
    console.log(id);
    if (!campaign) {
      throw new NotFoundException('Campaign Not found!');
    }

    campaign.status = updateStatusDto.status;
return this.parentCampaignRepository.save(campaign);
  }
  async findActive() {
    return this.parentCampaignRepository.find({
      where: { status: CampaignStatus.ACTIVE },
    });
  }

  deleteById(id: number) {
    this.CampaignRepository.delete(id);
    return {
      message: 'Campaign deleted successfully',
      status: true,
    };
  }
}
