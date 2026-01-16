import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { campaign, CampaignStatus, DiscountType } from './campaign.entity';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateCampaignDto } from './dtos/create-campaign.dto';
import { plainToInstance } from 'class-transformer';

import { validateSync } from 'class-validator';
import { RuleType } from './rules/rules.enum';
import { WholeCart } from './rules/entites/whole-cart.entity';
import { BulkPurchase } from './rules/entites/bulk-purchase.entity';
import { CategoryDiscount } from './rules/entites/category-discount.entity';


@Injectable()
export class CampaignsService {
  constructor(
    @InjectRepository(campaign)
    private readonly CampaignRepository: Repository<campaign>,
  ) {}

  create(CreateCampaignDto: CreateCampaignDto) {
    const campaign = this.CampaignRepository.create({
      name: CreateCampaignDto.name,
      description: CreateCampaignDto.description,
      useItAsCoupon: CreateCampaignDto.useItAsCoupon,
      startAt: CreateCampaignDto.startAt,
      endAt: CreateCampaignDto.endAt,
      status: CampaignStatus.DRAFT,
      metadata: CreateCampaignDto.metadata,
      couponType: CreateCampaignDto.couponType,
      discountType: DiscountType.ORDER_DISCOUNT,
      isActive: CreateCampaignDto.isActive,
      rules: CreateCampaignDto.rules,
      maxUses: CreateCampaignDto.maxUses,
      unlimitedUses: CreateCampaignDto.unlimitedUses,
      redemptionType: CreateCampaignDto.redemptionType,
      userEligiblity: CreateCampaignDto.userEligiblity,
      recurringValidity: CreateCampaignDto.recurringValidity,
      recurringCycle: CreateCampaignDto.recurringCycle,
      recurringValidDays: CreateCampaignDto.recurringValidDays,
      recurringStartTime: CreateCampaignDto.recurringStartTime,
      recurringEndTime: CreateCampaignDto.recurringEndTime,
      notification: CreateCampaignDto.notification
        ? { ...CreateCampaignDto.notification }
        : undefined,
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
        bulkPurchase.discountPercent = rules.discoutPercent || rules.discountPercent;
        bulkPurchase.discountAmount = rules.discountAmount;
        bulkPurchase.minQuantity = rules.minQuantity;
        campaign.bulkPurchase = bulkPurchase;
      } else if (rules.ruleType === RuleType.CATEGORY) {
        const categoryDiscount = new CategoryDiscount();
        categoryDiscount.ruleType = rules.ruleType;
        categoryDiscount.discountMode = rules.discountMode;
        categoryDiscount.discountPercent = rules.discoutPercent || rules.discountPercent;
        categoryDiscount.discountAmount = rules.discountAmount;
        categoryDiscount.categoryId = rules.categoryId;
        campaign.categoryDiscount = categoryDiscount;
      }
    }

    return this.CampaignRepository.save(campaign);
  }

  findAll() {
    return this.CampaignRepository.find({
      where: { discountType: DiscountType.ORDER_DISCOUNT },
      relations: {
        notification: true,
      },
    });
  }

  findOne(id: number) {
    return this.CampaignRepository.findOne({
      where: { id },
    });
  }

  async UpdateStatus(id: number) {
    const campaign = await this.findOne(id);
    console.log(id);
    if (!campaign) {
      throw new NotFoundException('Campaign Not found!');
    }

    campaign.status = CampaignStatus.ACTIVE;
    return this.CampaignRepository.save(campaign);
  }
  async findActive() {
    const now = new Date();
    return this.CampaignRepository.find({
      where: { status: CampaignStatus.ACTIVE },
    });
  }
}
  