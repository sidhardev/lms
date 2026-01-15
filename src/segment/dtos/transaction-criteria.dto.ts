import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ComparisonOperator } from '../enums/segment-opretaors.enum';
import { conditions } from '../enums/comparison.enum';
import { TransactionRules } from '../enums/transaction-rule.enum';

export class CreateTransactionCriteriaDto {
  @ApiProperty({ example: 15 })
  @IsNumber()
  userSegmentId: number;

  @ApiPropertyOptional({ example: TransactionRules.TOTAL_AMOUNT_SPEND })
  @IsEnum(TransactionRules)
  rule: TransactionRules;

  @ApiPropertyOptional({
    enum: ComparisonOperator,
    example: ComparisonOperator.GREATER_THAN,
  })
  @IsEnum(ComparisonOperator)
  comparisionOpreator: ComparisonOperator;

  @ApiProperty({
    enum: conditions,
    example: conditions.IS,
  })
  @IsEnum(conditions)
  conditions: conditions;

  @ApiPropertyOptional({ example: 1000 })
  @IsNumber()
  @IsOptional()
  value: number;

  @ApiPropertyOptional({ example: '2024-06-01' })
  @IsDateString()
  @IsOptional()
  startDate: Date;

  @ApiPropertyOptional({ example: '2024-06-30' })
  @IsDateString()
  @IsOptional()
  endDate: Date;
}
