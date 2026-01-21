import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { campaign, CampaignStatus } from './entites/discount-campaign.entity';
import { Repository } from 'typeorm';
import { CreateCampaignDto } from './dtos/create-campaign.dto';

import { RuleType } from './rules/rules.enum';
import { WholeCart } from './entites/whole-cart.entity';
import { BulkPurchase } from './entites/bulk-purchase.entity';
import { CategoryDiscount } from './entites/category-discount.entity';
import { Campaigns } from '../campaign.entity';
import { campaignType } from '../enums/campaign-type.enum';

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
      status: CreateCampaignDto.status,
    });
    const savedParent =
      await this.parentCampaignRepository.save(parentCampaign);

    const campaign = this.CampaignRepository.create({
      useItAsCoupon: CreateCampaignDto.useItAsCoupon,

      status: CampaignStatus.DRAFT,
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
      notifications: (CreateCampaignDto as any).notifications
        ? (CreateCampaignDto as any).notifications.map((n: any) => ({ ...n }))
        : undefined,
      campaign: savedParent,
    });

    const rules = CreateCampaignDto.rules as any;
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
          rules.discoutPercent || rules.discountPercent;
        bulkPurchase.discountAmount = rules.discountAmount;
        bulkPurchase.minQuantity = rules.minQuantity;
        campaign.bulkPurchase = bulkPurchase;
      } else if (rules.ruleType === RuleType.CATEGORY) {
        const categoryDiscount = new CategoryDiscount();
        categoryDiscount.ruleType = rules.ruleType;
        categoryDiscount.discountMode = rules.discountMode;
        categoryDiscount.discountPercent =
          rules.discoutPercent || rules.discountPercent;
        categoryDiscount.discountAmount = rules.discountAmount;
        categoryDiscount.categoryId = rules.categoryId;
        campaign.categoryDiscount = categoryDiscount;
      }
    }

    return this.CampaignRepository.save(campaign);
  }

  async findAll(page, limit) {
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
    return this.CampaignRepository.save(campaign);
  }
  async findActive() {
    const now = new Date();
    return this.CampaignRepository.find({
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
