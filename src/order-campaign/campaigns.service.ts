import {
  Injectable,
  
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { campaign, CampaignStatus, DiscountType } from './campaign.entity';
import { Repository } from 'typeorm';
import { CreateCampaignDto } from './dtos/create-campaign.dto';

import { RuleType } from './rules/rules.enum';
import { WholeCart } from './entites/whole-cart.entity';
import { BulkPurchase } from './entites/bulk-purchase.entity';
import { CategoryDiscount } from './entites/category-discount.entity';
import { LoyaltyProgramService } from 'src/loyalty-program/loyalty-program.service';


@Injectable()
export class CampaignsService {
  constructor(
    @InjectRepository(campaign)
    private readonly CampaignRepository: Repository<campaign>, 
    private loyaltyService: LoyaltyProgramService
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
      discountType: CreateCampaignDto.discountType,
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
      notifications: (CreateCampaignDto as any).notifications
        ? (CreateCampaignDto as any).notifications.map((n: any) => ({ ...n }))
        : undefined,
      shippingMethod: (CreateCampaignDto as any).shippingMethod,
      minOrderValue: (CreateCampaignDto as any).minOrderValue,
      maxDiscount: (CreateCampaignDto as any).maxDiscount,
      eligible_locations: (CreateCampaignDto as any).eligible_locations,
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

   async findAll(page, limit) {
    const campaign =  await this.CampaignRepository.find({
      relations: {
        notifications: true,
      },
    });
    const loyaltyProgram = await this.loyaltyService.findAll(page, limit);

    const response = [...campaign, ...loyaltyProgram]

return response;
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

  deleteById(id: number) {
     this.CampaignRepository.delete(id);
     return {
      message: 'Campaign deleted successfully',
      status: true
     }
  
  }
}
  