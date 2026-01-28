import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { BasicSegmentType } from '../enums/segementType.enum';

import { CreateMembersCriteriaDto } from './members-criteria.dto';
import { CreateEngagementCriteriaDto } from './engagement-criteria.dto';
import { CreateDiscountCriteriaDto } from './discount-criteria.dto';
import { CreateTransactionCriteriaDto } from './transaction-criteria.dto';

import { CreateProductInteractionDto } from './product-interaction.dto';
import { CreateStockLevelDto } from './stock-level.dto';
import { CreatePurchaseFrequencyDto } from './purchase-frequency.dto';
import { CreatePriceBasedDto } from './price-based.dto';
import { SegmentType } from '../enums/segment-type.enum';
import { inclusion_status } from '../enums/inclusion_status.enum';

export class CreateSegmentDto {
  @ApiProperty({
    example: 'High Value Customers',
    description: 'Name of the segment',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Customers who placed more than 3 orders',
    required: false,
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    example: SegmentType,
  })
  @IsEnum(SegmentType)
  segmentType: SegmentType;

  @ApiProperty({
    enum: BasicSegmentType,
    example: BasicSegmentType,
  })
  @IsEnum(BasicSegmentType)
  @IsOptional()
  BasicSegmentType: BasicSegmentType;

  @ApiProperty({
    type: [CreateMembersCriteriaDto],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMembersCriteriaDto)
  membersCriteria: CreateMembersCriteriaDto[];

  @ApiProperty({
    type: [CreateEngagementCriteriaDto],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateEngagementCriteriaDto)
  engagementCriteria: CreateEngagementCriteriaDto[];

  @ApiProperty({
    type: [CreateDiscountCriteriaDto],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDiscountCriteriaDto)
  discountCriteria: CreateDiscountCriteriaDto[];

  @ApiProperty({
    type: [CreateTransactionCriteriaDto],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTransactionCriteriaDto)
  transactionCriteria: CreateTransactionCriteriaDto[];

  @ApiProperty({
    type: [CreateProductInteractionDto],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductInteractionDto)
  productInteraction: CreateProductInteractionDto[];

  @ApiProperty({
    type: [CreateStockLevelDto],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateStockLevelDto)
  stockLevel: CreateStockLevelDto[];

  @ApiProperty({
    type: [CreatePurchaseFrequencyDto],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePurchaseFrequencyDto)
  purchaseFrequency: CreatePurchaseFrequencyDto[];

  @ApiProperty({
    type: [CreatePriceBasedDto],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePriceBasedDto)
  priceBased: CreatePriceBasedDto[];

  @IsEnum(inclusion_status)
  @IsOptional()
  inclusion_status: inclusion_status;

  @IsOptional()
  selectedSegment: number[];
}
