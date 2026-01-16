import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ComparisonOperator } from '../enums/segment-opretaors.enum';
import { conditions } from '../enums/comparison.enum';
import { EngagementRuleType } from '../enums/engagement-rule.enum';

export class CreateEngagementCriteriaDto {
   

  @ApiPropertyOptional({ example: EngagementRuleType.ANY_EMAIL })
  @IsEnum(EngagementRuleType)
  @IsOptional()
  rule?: EngagementRuleType;

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

  @ApiProperty({ example: 10 })
  @IsNumber()
  value: number;
}
