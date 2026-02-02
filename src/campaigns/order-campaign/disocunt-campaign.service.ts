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


    const rules = CreateCampaignDto as any;
    if (rules) {
      if (rules.ruleType === RuleType.WHOLE_CART) {
        const wholeCart = new WholeCart();
        wholeCart.ruleType = rules.ruleType;
        wholeCart.discountMode = rules.discountMode;
        wholeCart.discountPercent = rules.discoutPercent;
        wholeCart.discountAmount = rules.discountAmount;
        wholeCart.maxDiscount = rules.MaxDiscount;
        campaign.wholeCart = wholeCart;
      } else if (rules.ruleType === RuleType.BULK_PURCHASE) {
        const bulkPurchase = new BulkPurchase();
        bulkPurchase.ruleType = rules.ruleType;
        bulkPurchase.discountMode = rules.discountMode;
        bulkPurchase.discountPercent =
          rules.discoutPercent;
        bulkPurchase.discountAmount = rules.discountAmount;
        bulkPurchase.minOrderValue = rules.minOrderValue;
        bulkPurchase.minItems = rules.minItems;
        campaign.bulkPurchase = bulkPurchase;
      } 
      else if (rules.ruleType === RuleType.CART_TOTAL_CUSTOM) {
        const cartTotal = new CartCustomTotal();
        cartTotal.ruleType = rules.ruleType;
        cartTotal.mode = rules.mode;
        cartTotal.minOrderValue = rules.minOrderValue;
        cartTotal.MinPercent = rules.MinPercent;
        cartTotal.MaxPercent = rules.MaxPercent;
        cartTotal.MaxDiscount = rules.MaxDiscount;
        cartTotal.minAmount = rules.minAmount;
        cartTotal.maxAmount = rules.maxAmount;
        

      }
     
    }

    return this.CampaignRepository.save(campaign);
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
