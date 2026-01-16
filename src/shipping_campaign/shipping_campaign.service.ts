import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { campaign, CampaignStatus } from 'src/campaigns/campaign.entity';
import { Repository } from 'typeorm';
import { CreateFreeShippingDto } from './free_shipping.dto';
import { CreateCampaignDto } from 'src/campaigns/dtos/create-campaign.dto';
import { CouponType } from 'src/coupons/admin/coupon-type.enum';

@Injectable()
export class ShippingCampaignService {
  constructor(
    @InjectRepository(campaign)
    private readonly CampaignRepository: Repository<campaign>,
  ) {}

  create(CreateFreeShippingDto: CreateFreeShippingDto) {
    const campaign = this.CampaignRepository.create({
      name: CreateFreeShippingDto.name,
      description: CreateFreeShippingDto.description,
      startAt: CreateFreeShippingDto.startAt,
      endAt: CreateFreeShippingDto.endAt,
      status: CampaignStatus.DRAFT,
      metadata: CreateFreeShippingDto.metadata,
      discountType: CreateFreeShippingDto.discountType,
      couponType: CouponType.FREE_SHIPPING,
      isActive: CreateFreeShippingDto.isActive,
      shippingMethod: CreateFreeShippingDto.shippingMethod,
      minOrderValue: CreateFreeShippingDto.minOrderValue,
      maxDiscount: CreateFreeShippingDto.maxDiscount,
      eligible_locations: CreateFreeShippingDto.eligible_locations,
      maxUses: CreateFreeShippingDto.maxUses,
      unlimitedUses: CreateFreeShippingDto.unlimitedUses,
      redemptionType: CreateFreeShippingDto.redemptionType,
      userEligiblity: CreateFreeShippingDto.userEligiblity,
      recurringValidity: CreateFreeShippingDto.recurringValidity,
      recurringCycle: CreateFreeShippingDto.recurringCycle,
      recurringValidDays: CreateFreeShippingDto.recurringValidDays,
      recurringStartTime: CreateFreeShippingDto.recurringStartTime,
      recurringEndTime: CreateFreeShippingDto.recurringEndTime,
    });
    return this.CampaignRepository.save(campaign);
  }

  findAll() {
    return this.CampaignRepository.find({
      where: { couponType: CouponType.FREE_SHIPPING },
    });
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
