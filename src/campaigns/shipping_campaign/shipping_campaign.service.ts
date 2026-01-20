import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { campaign, CampaignStatus } from 'src/campaigns/order-campaign/discount-campaign.entity';
import { Repository } from 'typeorm';
 import { CreateCampaignDto } from 'src/campaigns/order-campaign/dtos/create-campaign.dto';
  import { campaignType } from '../campaign-type.enum';
import { Campaigns } from '../campaign.entity';
import { CouponType } from 'src/coupons/admin/coupon-type.enum';

@Injectable()
export class ShippingCampaignService {
  constructor(
    @InjectRepository(campaign)
    private readonly CampaignRepository: Repository<campaign>,
    @InjectRepository(Campaigns) private parentCampaignRepository: Repository<Campaigns>
  ) {}

  async create(CreateCampaignDto: CreateCampaignDto) {

    const parentCampaign = this.parentCampaignRepository.create({
      name: (CreateCampaignDto as any).name,
      description: (CreateCampaignDto as any).description,
      type: campaignType.DISCOUNT_COUPON,
      startAt: CreateCampaignDto.startAt,
            endAt: CreateCampaignDto.endAt,


    });
    const savedParent = await this.parentCampaignRepository.save(parentCampaign);
    const campaign = this.CampaignRepository.create({
       status: CampaignStatus.DRAFT,
      metadata: CreateCampaignDto.metadata,
      discountType: CreateCampaignDto.discountType,
      couponType: CouponType.FREE_SHIPPING,
      isActive: CreateCampaignDto.isActive,
      shippingMethod: CreateCampaignDto.shippingMethod,
      minOrderValue: CreateCampaignDto.minOrderValue,
      maxDiscount: CreateCampaignDto.maxDiscount,
       countries: CreateCampaignDto.countries,
      states: CreateCampaignDto.states,
      cities: CreateCampaignDto.cities,
      maxUses: CreateCampaignDto.maxUses,
      unlimitedUses: CreateCampaignDto.unlimitedUses,
      redemptionType: CreateCampaignDto.redemptionType,
      userEligiblity: CreateCampaignDto.userEligiblity,
      recurringValidity: CreateCampaignDto.recurringValidity,
      recurringCycle: CreateCampaignDto.recurringCycle,
      recurringValidDays: CreateCampaignDto.recurringValidDays,
      recurringStartTime: CreateCampaignDto.recurringStartTime,
      recurringEndTime: CreateCampaignDto.recurringEndTime,
            campaign: savedParent,

    });
    return this.CampaignRepository.save(campaign);
  }

  findAll() {
    return this.CampaignRepository.find();
  }

  async findOne(id: number) {
    return await this.CampaignRepository.findOne({
      where: { id },
    });
  }

  async UpdateStatus(id: number) {
    const campaign = await this.findOne(id);
    console.log(id);
    if (!campaign) {
      throw new NotFoundException('Campaign Not found!');
    }
  }

  deleteById(id: number) {
    this.CampaignRepository.delete(id);
    return {
      message: 'Campaign deleted successfully',
      status: true,
    };
  }
}
