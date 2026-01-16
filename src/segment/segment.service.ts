import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Segment } from './entites/segment.enity';
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

import { CreateSegmentDto } from './dtos/create-segment.dto';
import { segmentType } from './enums/segementType.enum';

@Injectable()
export class SegmentService {
  constructor(
    @InjectRepository(Segment)
    private readonly segmentRepository: Repository<Segment>,

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
    this.validateSegmentType(dto);
    const segment = this.segmentRepository.create({
      name: dto.name,
      description: dto.description,
      segmentType: dto.segmentType,
    });

    const savedSegment = await this.segmentRepository.save(segment);

    if (dto.segmentType === segmentType.USER_SEGMENT) {
      await this.createUserSegment(dto, savedSegment);
    }

    if (dto.segmentType === segmentType.PRODUCT_SEGMENT) {
      await this.createProductSegment(dto, savedSegment);
    }

    return savedSegment;
  }

 
  private async createUserSegment(dto: CreateSegmentDto, segment: Segment) {
    const userSegment = await this.userSegmentRepository.save(
      this.userSegmentRepository.create({ segment }),
    );

    if (dto.membersCriteria?.length) {
      await this.membersCriteriaRepository.save(
        dto.membersCriteria.map(c =>
          this.membersCriteriaRepository.create({
            ...c,
            userSegment,
          }),
        ),
      );
    }

    if (dto.engagementCriteria?.length) {
      await this.engagementCriteriaRepository.save(
        dto.engagementCriteria.map(c =>
          this.engagementCriteriaRepository.create({
            ...c,
            userSegment,
          }),
        ),
      );
    }

    if (dto.discountCriteria?.length) {
      await this.discountCriteriaRepository.save(
        dto.discountCriteria.map(c =>
          this.discountCriteriaRepository.create({
            ...c,
            userSegment,
          }),
        ),
      );
    }

    if (dto.transactionCriteria?.length) {
      await this.transactionCriteriaRepository.save(
        dto.transactionCriteria.map(c =>
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
        dto.productInteraction.map(c =>
          this.productInteractionRepository.create({
            ...c,
            ProductSegment: productSegment,
          }),
        ),
      );
    }

    if (dto.stockLevel?.length) {
      await this.stockLevelRepository.save(
        dto.stockLevel.map(c =>
          this.stockLevelRepository.create({
            ...c,
            ProductSegment: productSegment,
          }),
        ),
      );
    }

    if (dto.purchaseFrequency?.length) {
      await this.purchaseFrequencyRepository.save(
        dto.purchaseFrequency.map(c =>
          this.purchaseFrequencyRepository.create({
            ...c,
            ProductSegment: productSegment,
          }),
        ),
      );
    }

    if (dto.priceBased?.length) {
      await this.priceBasedRepository.save(
        dto.priceBased.map(c =>
          this.priceBasedRepository.create({
            ...c,
            ProductSegment: productSegment,
          }),
        ),
      );
    }
  }

 
  getAll() {
    return this.segmentRepository.find({
      relations: {
        UserSegment: {
          membersCriteria: true,
          engagementCriteria: true,
          discountCriteria: true,
          transactionCriteria: true,
        },
        ProductSegment: {
          productInteraction: true,
          stockLevel: true,
          purchaseFrequency: true,
          priceBased: true,
        },
      },
      order: {
        id: 'ASC',
      },
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

  if (dto.segmentType === segmentType.USER_SEGMENT && hasProductCriteria) {
    throw new BadRequestException(
      'USER_SEGMENT cannot contain product criteria',
    );
  }

  if (dto.segmentType === segmentType.PRODUCT_SEGMENT && hasUserCriteria) {
    throw new BadRequestException(
      'PRODUCT_SEGMENT cannot contain user criteria',
    );
  }

  if (!hasUserCriteria && !hasProductCriteria) {
    throw new BadRequestException(
      'At least one criteria must be provided',
    );
  }
}



}
