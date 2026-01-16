import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ComparisonOperator } from '../enums/segment-opretaors.enum';
import { conditions } from '../enums/comparison.enum';
import { DiscountRule } from '../enums/discount-criteria.enum';

export class CreateDiscountCriteriaDto {
  

  @ApiPropertyOptional({ example: DiscountRule.DISCOUNT_TYPE })
  @IsEnum(DiscountRule)
  @IsOptional()
  rules?: DiscountRule;

  @ApiPropertyOptional({
    enum: ComparisonOperator,
    example: ComparisonOperator.GREATER_THAN,
  })
  @IsEnum(ComparisonOperator)
  @IsOptional()
  comparisionOpreator?: ComparisonOperator;

  @ApiProperty({
    enum: conditions,
    example: conditions.IS,
  })
  @IsEnum(conditions)
  conditions: conditions;

  @ApiPropertyOptional({ example: 500 })
  @IsNumber()
  @IsOptional()
  value?: number;

  @ApiPropertyOptional({ example: 200 })
  @IsNumber()
  @IsOptional()
  startValue?: number;

  @ApiPropertyOptional({ example: 1000 })
  @IsNumber()
  @IsOptional()
  endValue?: number;
}
