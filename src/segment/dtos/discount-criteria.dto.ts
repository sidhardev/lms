import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ComparisonOperator } from '../enums/segment-opretaors.enum';
import { conditions } from '../enums/comparison.enum';

export class CreateDiscountCriteriaDto {
  @ApiProperty({ example: 12 })
  @IsNumber()
  userSegmentId: number;

  @ApiPropertyOptional({ example: 'Order amount based discount' })
  @IsString()
  @IsOptional()
  rules?: string;

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
