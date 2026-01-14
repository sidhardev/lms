import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoyaltyProgram } from './loyalty-program.entity';
import { Repository } from 'typeorm';
import { CreateLoyaltyProgramDto } from './dtos/create-loyalty-program.dto';

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
      rules: dto.rules,
      notification: dto.notification ? { ...dto.notification } : undefined,
    });

    return await this.loyaltyRepository.save(loyaltyProgram);
  }

  async findAll() {
    return await this.loyaltyRepository.find({
      relations: {
        notification: true,
      },
    });
  }
}
