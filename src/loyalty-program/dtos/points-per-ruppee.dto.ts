 
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  Min,
  ValidateIf,
  IsDefined,
} from 'class-validator';
import { AccumulationRuleType, PointsMode } from '../enums/points.enum';

export class PointsPerRupeeDto {
  @ApiProperty({
    enum: AccumulationRuleType,
    example: AccumulationRuleType.POINTS_PER_RUPEE,
  })
  @IsEnum(AccumulationRuleType)
  ruleType: AccumulationRuleType.POINTS_PER_RUPEE;

  @ApiProperty({ enum: PointsMode, example: PointsMode.DYNAMIC })
  @IsEnum(PointsMode)
  mode: PointsMode;

  @ApiPropertyOptional({
    example: 50,
    description: 'Order amount required to earn points. Required for DYNAMIC mode',
  })
  @ValidateIf((o) => o.mode === PointsMode.DYNAMIC)
  @IsDefined()
  @IsNumber()
  @Min(1)
  orderSpend: number;

  @ApiProperty({
    example: 1,
    description: 'Points earned for given order spend',
  })
  @IsNumber()
  @Min(1)
  pointsEarned: number;

  @ApiPropertyOptional({
    example: true,
    description:
      'Whether points are calculated after discount is applied. Required for DYNAMIC mode',
  })
  @ValidateIf((o) => o.mode === PointsMode.DYNAMIC)
  @IsDefined()
  @IsBoolean()
  applyAfterDiscount: boolean;
}
