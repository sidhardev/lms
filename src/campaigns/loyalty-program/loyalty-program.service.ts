import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoyaltyProgram } from './entities/loyalty-program.entity';
import { Repository } from 'typeorm';
import { CreateLoyaltyProgramDto } from './dtos/create-loyalty-program.dto';
import { AccumulationRuleType } from '../enums/points.enum';
import { CategoryBasedDto } from './dtos/category-based.dto';
import { Campaigns } from '../campaign.entity';
import { campaignType } from '../enums/campaign-type.enum';

@Injectable()
export class LoyaltyProgramService {
  constructor(
    @InjectRepository(LoyaltyProgram)
    private readonly loyaltyRepository: Repository<LoyaltyProgram>,
    @InjectRepository(Campaigns)
    private readonly parentCampaignRepository: Repository<Campaigns>,
  ) {}

  async create(dto: CreateLoyaltyProgramDto): Promise<LoyaltyProgram> {
    const parentCampaign = this.parentCampaignRepository.create({
      name: dto.name,
      description: dto.description,
      type: campaignType.LOYALTY_PROGRAM,
      startAt: new Date(dto.startAt),
      endAt: new Date(dto.endAt),
      status: dto.status,
    });
    const savedParent =
      await this.parentCampaignRepository.save(parentCampaign);

    const loyaltyProgram = this.loyaltyRepository.create({
      validDays: dto.validDays,
      validityStartTime: dto.validityStartTime,
      validityEndTime: dto.validityEndTime,
      notification: dto.notification ? { ...dto.notification } : undefined,
      campaign: savedParent,
    });

    if (dto.rules) {
      switch (dto.rules.ruleType) {
        case AccumulationRuleType.POINTS_PER_RUPEE:
          loyaltyProgram.pointsPerRupee = dto.rules as any;
          break;
        case AccumulationRuleType.FIRST_PURCHASE:
          loyaltyProgram.firstPurchase = dto.rules as any;
          break;
        case AccumulationRuleType.DAILY_LOGIN_STREAK:
          loyaltyProgram.dailyLoginStreak = dto.rules as any;
          break;
        case AccumulationRuleType.CATEGORY_BASED:
          const categoryRule = dto.rules as CategoryBasedDto;
          loyaltyProgram.categoryBased = categoryRule.categories as any;
          break;
      }
    }

    return await this.loyaltyRepository.save(loyaltyProgram);
  }

  async findAll(page: number, limit: number) {
    return await this.parentCampaignRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }
  async deleteById(id: number) {
    await this.loyaltyRepository.delete(id);
    return {
      message: 'Loyalty Program deleted successfully',
      status: true,
    };
  }
}
