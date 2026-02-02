import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  campaign,
  CampaignStatus,
} from 'src/campaigns/order-campaign/entites/discount-campaign.entity';
import { Repository } from 'typeorm';
import { CreateCampaignDto } from 'src/campaigns/order-campaign/dtos/create-campaign.dto';
import { campaignType } from '../enums/campaign-type.enum';
import { Campaigns } from '../campaign.entity';
import { CampaignNotification } from 'src/notifications/entities/notification.entity';

@Injectable()
export class ShippingCampaignService {
  constructor(
    @InjectRepository(campaign)
    private readonly CampaignRepository: Repository<campaign>,
    @InjectRepository(Campaigns)
    private parentCampaignRepository: Repository<Campaigns>,
    @InjectRepository(CampaignNotification)
    private readonly notificationRepository: Repository<CampaignNotification>,
  ) {}

  async create(CreateCampaignDto: CreateCampaignDto) {
    const parentCampaign = this.parentCampaignRepository.create({
      name: (CreateCampaignDto as any).name,
      description: (CreateCampaignDto as any).description,
      type: campaignType.DISCOUNT_COUPON,
      startAt: CreateCampaignDto.startAt,
      endAt: CreateCampaignDto.endAt,
      status: CampaignStatus.ACTIVE,
    });
    const savedParent =
      await this.parentCampaignRepository.save(parentCampaign);
    const campaign = this.CampaignRepository.create({
      discountType: CreateCampaignDto.discountType,
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

    if (
      (CreateCampaignDto as any).notifications &&
      (CreateCampaignDto as any).notifications.length > 0
    ) {
      const notifications = await this.notificationRepository.save(
        (CreateCampaignDto as any).notifications.map((n: any) => ({
          ...n,
          campaign: null,
        })),
      );
      parentCampaign.notifications = notifications;
    }

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
