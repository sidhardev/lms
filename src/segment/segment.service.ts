import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { CreateSegmentDto } from './dtos/create-segment.dto';
import { Segment } from './entites/segment.enity';
import { UserSegment } from './entites/user_segment.entity';
import { ProductSegment } from './entites/product_segment.entity';

import { MembersCriteria } from './entites/members-criteria.entity';
import { EngagementCriteria } from './entites/engagement-criteria.entity';
import { discountCriteria } from './entites/discount-criteria.entity';
import { TransactionCriteria } from './entites/transaction-criteria.entity';
import { ProductInteraction } from './entites/product-interaction.entity';
import { StockLevel } from './entites/stock-level.entity';
import { PriceBased } from './entites/price-based.entity';
import { PurchaseFrequency } from './entites/purchase-frequency.entity';

import { CreateMembersCriteriaDto } from './dtos/members-criteria.dto';
import { CreateEngagementCriteriaDto } from './dtos/engagement-criteria.dto';
import { CreateDiscountCriteriaDto } from './dtos/discount-criteria.dto';
import { CreateTransactionCriteriaDto } from './dtos/transaction-criteria.dto';
import { CreateProductInteractionDto } from './dtos/product-interaction.dto';
import { CreateStockLevelDto } from './dtos/stock-level.dto';
import { CreatePurchaseFrequencyDto } from './dtos/purchase-frequency.dto';
import { CreatePriceBasedDto } from './dtos/price-based.dto';

import { segmentType } from './enums/segementType.enum';
import { membersCriteria } from './enums/members.enum';
import { EngagementRuleType } from './enums/engagement-rule.enum';
import { DiscountRule } from './enums/discount-criteria.enum';
import { TransactionRules } from './enums/transaction-rule.enum';
import { ProductInteractionRule } from './enums/product-interaction.enum';
import { stockLevelRule } from './enums/stock-level.enum';
import { PurchaseFrequencyRule } from './enums/purchase-frequency.enum';
import { UserCriteria } from './enums/user-criteria.enum';
import { ProductCriteria } from './enums/product-criteria.enum';

@Injectable()
export class SegmentService {
  constructor(
    @InjectRepository(Segment)
    private segmentRepository: Repository<Segment>,
    @InjectRepository(UserSegment)
    private userSegmentRepository: Repository<UserSegment>,
    @InjectRepository(ProductSegment)
    private productSegmentRepository: Repository<ProductSegment>,
    @InjectRepository(MembersCriteria)
    private membersCriteriaRepository: Repository<MembersCriteria>,
    @InjectRepository(EngagementCriteria)
    private engagementCriteriaRepository: Repository<EngagementCriteria>,
    @InjectRepository(discountCriteria)
    private discountCriteriaRepository: Repository<discountCriteria>,
    @InjectRepository(TransactionCriteria)
    private transactionCriteriaRepository: Repository<TransactionCriteria>,
    @InjectRepository(ProductInteraction)
    private productInteractionRepository: Repository<ProductInteraction>,
    @InjectRepository(StockLevel)
    private stockLevelRepository: Repository<StockLevel>,
    @InjectRepository(PriceBased)
    private priceBasedRepository: Repository<PriceBased>,
    @InjectRepository(PurchaseFrequency)
    private purchaseFrequencyRepository: Repository<PurchaseFrequency>,
  ) {}

  async create(createSegmentDto: CreateSegmentDto) {
    const { segmentType: type, selectedCriterias } = createSegmentDto;

    for (const item of selectedCriterias) {
      await this.validateCriteria(type, item.criteria, item.criteriaType);
    }

    const segment = this.segmentRepository.create({
      name: createSegmentDto.name,
      description: createSegmentDto.description,
      segmentType: type,
    });
    const savedSegment = await this.segmentRepository.save(segment);

    if (type === segmentType.USER_SEGMENT) {
      const userSegment = this.userSegmentRepository.create({
        segment: savedSegment,
      });
      const savedUserSegment =
        await this.userSegmentRepository.save(userSegment);
      for (const item of selectedCriterias) {
        await this.saveUserCriteria(
          savedUserSegment,
          item.criteria,
          item.criteriaType,
        );
      }
    } else if (type === segmentType.PRODUCT_SEGMENT) {
      const productSegment = this.productSegmentRepository.create({
        segment: savedSegment,
      });
      const savedProductSegment =
        await this.productSegmentRepository.save(productSegment);
      for (const item of selectedCriterias) {
        await this.saveProductCriteria(
          savedProductSegment,
          item.criteria,
          item.criteriaType,
        );
      }
    }

    return savedSegment;
  }

  private async validateCriteria(
    type: segmentType,
    criteria: any,
    criteriaType: string,
  ) {
    let dtoClass: any;

    if (type === segmentType.USER_SEGMENT) {
      switch (criteriaType) {
        case UserCriteria.MEMBERS_CRITERIA:
          dtoClass = CreateMembersCriteriaDto;
          break;
        case UserCriteria.ENGAGEMENT_CRITERIA:
          dtoClass = CreateEngagementCriteriaDto;
          break;
        case UserCriteria.DISCOUNT_CRITERIA:
          dtoClass = CreateDiscountCriteriaDto;
          break;
        case UserCriteria.TRANSACTION_CRITERIA:
          dtoClass = CreateTransactionCriteriaDto;
          break;
        default:
          throw new BadRequestException(
            `Invalid criteria type '${criteriaType}' for USER_SEGMENT`,
          );
      }
    } else if (type === segmentType.PRODUCT_SEGMENT) {
      switch (criteriaType) {
        case ProductCriteria.PRODUCT_INTERACTION:
          dtoClass = CreateProductInteractionDto;
          break;
        case ProductCriteria.STOCK_LEVEL:
          dtoClass = CreateStockLevelDto;
          break;
        case ProductCriteria.PURCHASE_FREQUENCY:
          dtoClass = CreatePurchaseFrequencyDto;
          break;
        case ProductCriteria.PRICE_BASED:
          dtoClass = CreatePriceBasedDto;
          break;
        default:
          throw new BadRequestException(
            `Invalid criteria type '${criteriaType}' for PRODUCT_SEGMENT`,
          );
      }
    }

    const objectToValidate = { ...criteria };
    if (type === segmentType.USER_SEGMENT) {
      objectToValidate.userSegmentId = 0;
    }

    const dtoInstance = plainToInstance(dtoClass, objectToValidate);
    try {
      await validateOrReject(dtoInstance);
    } catch (errors) {
      throw new BadRequestException(errors);
    }
  }

  private async saveUserCriteria(
    userSegment: UserSegment,
    criteria: any,
    criteriaType: string,
  ) {
    if (criteriaType === UserCriteria.MEMBERS_CRITERIA) {
      await this.membersCriteriaRepository.save(
        this.membersCriteriaRepository.create({ ...criteria, userSegment }),
      );
    } else if (criteriaType === UserCriteria.ENGAGEMENT_CRITERIA) {
      await this.engagementCriteriaRepository.save(
        this.engagementCriteriaRepository.create({ ...criteria, userSegment }),
      );
    } else if (criteriaType === UserCriteria.DISCOUNT_CRITERIA) {
      await this.discountCriteriaRepository.save(
        this.discountCriteriaRepository.create({ ...criteria, userSegment }),
      );
    } else if (criteriaType === UserCriteria.TRANSACTION_CRITERIA) {
      await this.transactionCriteriaRepository.save(
        this.transactionCriteriaRepository.create({
          ...criteria,
          rules: criteria.rule,
          userSegment,
        }),
      );
    }
  }

  private async saveProductCriteria(
    productSegment: ProductSegment,
    criteria: any,
    criteriaType: string,
  ) {
    if (criteriaType === ProductCriteria.PRODUCT_INTERACTION) {
      await this.productInteractionRepository.save(
        this.productInteractionRepository.create({
          ...criteria,
          ProductSegment: productSegment,
        }),
      );
    } else if (criteriaType === ProductCriteria.STOCK_LEVEL) {
      await this.stockLevelRepository.save(
        this.stockLevelRepository.create({
          ...criteria,
          ProductSegment: productSegment,
        }),
      );
    } else if (criteriaType === ProductCriteria.PURCHASE_FREQUENCY) {
      await this.purchaseFrequencyRepository.save(
        this.purchaseFrequencyRepository.create({
          ...criteria,
          ProductSegment: productSegment,
        }),
      );
    } else if (criteriaType === ProductCriteria.PRICE_BASED) {
      await this.priceBasedRepository.save(
        this.priceBasedRepository.create({
          ...criteria,
          ProductSegment: productSegment,
        }),
      );
    }
  }
}
