import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ComparisonOperator } from '../enums/segment-opretaors.enum';
import { conditions } from '../enums/comparison.enum';

export class CreateEngagementCriteriaDto {
  @ApiProperty({ example: 8 })
  @IsNumber()
  userSegmentId: number;

  @ApiPropertyOptional({ example: 'User engagement based criteria' })
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

  @ApiProperty({ example: 10 })
  @IsNumber()
  value: number;
}
