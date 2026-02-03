import { Injectable } from '@nestjs/common';
import { CreateSegmentDto } from './dtos/create-basic-segment.dto';
import { Segment } from './entites/basic-segment.enity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSegment } from './entites/user_segment.entity';
import { discountCriteria } from './entites/discount-criteria.entity';
import { EngagementCriteria } from './entites/engagement-criteria.entity';
import { MembersCriteria } from './entites/members-criteria.entity';
import { TransactionCriteria } from './entites/transaction-criteria.entity';

@Injectable()
export class UsersService {
    constructor(  @InjectRepository(UserSegment)
    private readonly userSegmentRepository: Repository<UserSegment>,
     @InjectRepository(MembersCriteria)
    private readonly membersCriteriaRepository: Repository<MembersCriteria>,

    @InjectRepository(EngagementCriteria)
    private readonly engagementCriteriaRepository: Repository<EngagementCriteria>,

    @InjectRepository(discountCriteria)
    private readonly discountCriteriaRepository: Repository<discountCriteria>,

    @InjectRepository(TransactionCriteria)
    private readonly transactionCriteriaRepository: Repository<TransactionCriteria>,
) {}

       async createUserSegment(dto: CreateSegmentDto, segment: Segment) {
    const userSegment = await this.userSegmentRepository.save(
      this.userSegmentRepository.create({ segment }),
    );

    if (dto.membersCriteria?.length) {
      await this.membersCriteriaRepository.save(
        dto.membersCriteria.map((c) =>
          this.membersCriteriaRepository.create({
            ...c,
            userSegment,
          }),
        ),
      );
    }

    if (dto.engagementCriteria?.length) {
      await this.engagementCriteriaRepository.save(
        dto.engagementCriteria.map((c) =>
          this.engagementCriteriaRepository.create({
            ...c,
            userSegment,
          }),
        ),
      );
    }

    if (dto.discountCriteria?.length) {
      await this.discountCriteriaRepository.save(
        dto.discountCriteria.map((c) =>
          this.discountCriteriaRepository.create({
            ...c,
            userSegment,
          }),
        ),
      );
    }

    if (dto.transactionCriteria?.length) {
      await this.transactionCriteriaRepository.save(
        dto.transactionCriteria.map((c) =>
          this.transactionCriteriaRepository.create({
            ...c,
            rules: c.rule,
            userSegment,
          }),
        ),
      );
    }
  }
}
