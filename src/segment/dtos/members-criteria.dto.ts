import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString, IsNumber } from 'class-validator';
import { ComparisonOperator } from '../enums/segment-opretaors.enum';
import { conditions } from '../enums/comparison.enum';

export class CreateMembersCriteriaDto {
  @ApiProperty({ example: 5 })
  @IsNumber()
  userSegmentId: number;

  @ApiProperty({ example: 'Member signup date criteria' })
  @IsString()
  rules: string;

  @ApiPropertyOptional({
    enum: ComparisonOperator,
    example: ComparisonOperator.BETWEEN,
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

  @ApiPropertyOptional({ example: '2024-01-01' })
  @IsDateString()
  @IsOptional()
  startDate?: Date;

  @ApiPropertyOptional({ example: '2024-12-31' })
  @IsDateString()
  @IsOptional()
  endDate?: Date;

  @ApiPropertyOptional({ example: 'ACTIVE' })
  @IsString()
  @IsOptional()
  value?: string;
}
