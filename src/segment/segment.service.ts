import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Segment } from './entites/basic-segment.enity';
import { UserSegment } from './entites/user_segment.entity';
import { ProductSegment } from './entites/product_segment.entity';

import { MembersCriteria } from './entites/members-criteria.entity';
import { EngagementCriteria } from './entites/engagement-criteria.entity';
import { discountCriteria } from './entites/discount-criteria.entity';
import { TransactionCriteria } from './entites/transaction-criteria.entity';

import { ProductInteraction } from './entites/product-interaction.entity';
import { StockLevel } from './entites/stock-level.entity';
import { PurchaseFrequency } from './entites/purchase-frequency.entity';
import { PriceBased } from './entites/price-based.entity';

import { CreateSegmentDto } from './dtos/create-basic-segment.dto';
import { AdvancedSegment } from './entites/advance-segment.entity';
import { BasicSegmentType } from './enums/segementType.enum';
import { ParentSegment } from './entites/segment.entity';
import { SegmentType } from './enums/segment-type.enum';

@Injectable()
export class SegmentService {
  constructor(
    @InjectRepository(Segment)
    private readonly segmentRepository: Repository<Segment>,

    @InjectRepository(ParentSegment)
    private readonly parentSegmentRepo: Repository<ParentSegment>,

    @InjectRepository(AdvancedSegment)
    private readonly AdvancedSegmentRepo: Repository<AdvancedSegment>,

    @InjectRepository(UserSegment)
    private readonly userSegmentRepository: Repository<UserSegment>,

    @InjectRepository(ProductSegment)
    private readonly productSegmentRepository: Repository<ProductSegment>,

    @InjectRepository(MembersCriteria)
    private readonly membersCriteriaRepository: Repository<MembersCriteria>,

    @InjectRepository(EngagementCriteria)
    private readonly engagementCriteriaRepository: Repository<EngagementCriteria>,

    @InjectRepository(discountCriteria)
    private readonly discountCriteriaRepository: Repository<discountCriteria>,

    @InjectRepository(TransactionCriteria)
    private readonly transactionCriteriaRepository: Repository<TransactionCriteria>,

    @InjectRepository(ProductInteraction)
    private readonly productInteractionRepository: Repository<ProductInteraction>,

    @InjectRepository(StockLevel)
    private readonly stockLevelRepository: Repository<StockLevel>,

    @InjectRepository(PurchaseFrequency)
    private readonly purchaseFrequencyRepository: Repository<PurchaseFrequency>,

    @InjectRepository(PriceBased)
    private readonly priceBasedRepository: Repository<PriceBased>,
  ) {}

  async create(dto: CreateSegmentDto) {
    if (dto.segmentType !== SegmentType.BASIC_SEGMENT) {
      return this.CreateAdvancedSegment(dto);
    }
    this.validateSegmentType(dto);

    const parentSegment = this.parentSegmentRepo.create({
      name: dto.name,
      descriptiton: dto.description,
      segmentType: SegmentType.BASIC_SEGMENT,
    });

    const savedParentSegment = await this.parentSegmentRepo.save(parentSegment);

    const segment = this.segmentRepository.create({
      segmentType: dto.BasicSegmentType,
      ParentSegment: savedParentSegment,
    });

    const savedSegment = await this.segmentRepository.save(segment);

    if (dto.BasicSegmentType === BasicSegmentType.USER_SEGMENT) {
      await this.createUserSegment(dto, savedSegment);
    }

    if (dto.BasicSegmentType === BasicSegmentType.PRODUCT_SEGMENT) {
      await this.createProductSegment(dto, savedSegment);
    }

    return {
      parentSegment: savedParentSegment,
    };
  }

  private async createUserSegment(dto: CreateSegmentDto, segment: Segment) {
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

  private async createProductSegment(dto: CreateSegmentDto, segment: Segment) {
    const productSegment = await this.productSegmentRepository.save(
      this.productSegmentRepository.create({ segment }),
    );

    if (dto.productInteraction?.length) {
      await this.productInteractionRepository.save(
        dto.productInteraction.map((c) =>
          this.productInteractionRepository.create({
            ...c,
            ProductSegment: productSegment,
          }),
        ),
      );
    }

    if (dto.stockLevel?.length) {
      await this.stockLevelRepository.save(
        dto.stockLevel.map((c) =>
          this.stockLevelRepository.create({
            ...c,
            ProductSegment: productSegment,
          }),
        ),
      );
    }

    if (dto.purchaseFrequency?.length) {
      await this.purchaseFrequencyRepository.save(
        dto.purchaseFrequency.map((c) =>
          this.purchaseFrequencyRepository.create({
            ...c,
            ProductSegment: productSegment,
          }),
        ),
      );
    }

    if (dto.priceBased?.length) {
      await this.priceBasedRepository.save(
        dto.priceBased.map((c) =>
          this.priceBasedRepository.create({
            ...c,
            ProductSegment: productSegment,
          }),
        ),
      );
    }
  }

  async CreateAdvancedSegment(dto: CreateSegmentDto) {
    const parentSegment = this.parentSegmentRepo.create({
      name: dto.name,
      descriptiton: dto.description,
      segmentType: SegmentType.ADVANCED_SEGMENT,
    });

    const savedParentSegment = await this.parentSegmentRepo.save(parentSegment);

    await this.AdvancedSegmentRepo.save(
      this.AdvancedSegmentRepo.create({
        inclusion_status: dto.inclusion_status,
        selectedSegment: dto.selectedSegment,
        ParentSegment: savedParentSegment,
      }),
    );

    return {
      savedParentSegment,
    };
  }

  async getAll(page: number, limit: number) {
    return await this.parentSegmentRepo.find({
      relations: ['basicSegment', 'advanceSegment'],
      order: {
        id: 'ASC',
      },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  private validateSegmentType(dto: CreateSegmentDto) {
    const hasUserCriteria =
      !!dto.membersCriteria?.length ||
      !!dto.engagementCriteria?.length ||
      !!dto.discountCriteria?.length ||
      !!dto.transactionCriteria?.length;

    const hasProductCriteria =
      !!dto.productInteraction?.length ||
      !!dto.stockLevel?.length ||
      !!dto.purchaseFrequency?.length ||
      !!dto.priceBased?.length;

    if (
      dto.BasicSegmentType === BasicSegmentType.USER_SEGMENT &&
      hasProductCriteria
    ) {
      throw new BadRequestException(
        'USER_SEGMENT cannot contain product criteria',
      );
    }

    if (
      dto.BasicSegmentType === BasicSegmentType.PRODUCT_SEGMENT &&
      hasUserCriteria
    ) {
      throw new BadRequestException(
        'PRODUCT_SEGMENT cannot contain user criteria',
      );
    }

    if (!hasUserCriteria && !hasProductCriteria) {
      throw new BadRequestException('At least one criteria must be provided');
    }
  }

  async deleteById(id: number) {
    await this.parentSegmentRepo.delete(id);
    return {
      message: 'Segment Deleted Sucessfully!',
    };
  }

  async findById(id: number) {
    return await this.parentSegmentRepo.findOne({
      where: {
        id,
      },
      relations: ['basicSegment', 'advanceSegment'],
    });
  }
}
