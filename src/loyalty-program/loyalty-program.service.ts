import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoyaltyProgram } from './loyalty-program.entity';
import { Repository } from 'typeorm';
import { CreateLoyaltyProgramDto } from './dtos/create-loyalty-program.dto';
import { AccumulationRuleType } from './enums/points.enum';
import { CategoryBasedDto } from './dtos/category-based.dto';

@Injectable()
export class LoyaltyProgramService {
  constructor(
    @InjectRepository(LoyaltyProgram)
    private readonly loyaltyRepository: Repository<LoyaltyProgram>,
  ) {}

  async create(dto: CreateLoyaltyProgramDto): Promise<LoyaltyProgram> {
    const loyaltyProgram = this.loyaltyRepository.create({
      name: dto.name,
      description: dto.description,
      startAt: new Date(dto.startAt),
      endAt: new Date(dto.endAt),
      validDays: dto.validDays,
      validityStartTime: dto.validityStartTime,
      validityEndTime: dto.validityEndTime,
      notification: dto.notification ? { ...dto.notification } : undefined,
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

  async findAll() {
    return await this.loyaltyRepository.find({
      relations: {
        notification: true,
        pointsPerRupee: true,
        firstPurchase: true,
        dailyLoginStreak: true,
        categoryBased: true,
      },
    });
  }
  deleteById(id: number) {
    this.loyaltyRepository.delete(id);
    return {
      message: 'Loyalty Program deleted successfully',
      status: true
    }
  }
}
