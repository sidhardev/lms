 
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNumber, Min } from 'class-validator';
import { AccumulationRuleType, PointsMode } from '../enums/points.enum';

export class PointsPerRupeeDto {
  @ApiProperty({ enum: AccumulationRuleType, example: AccumulationRuleType.POINTS_PER_RUPEE })
  @IsEnum(AccumulationRuleType)
  ruleType: AccumulationRuleType.POINTS_PER_RUPEE;

  @ApiProperty({ enum: PointsMode, example: PointsMode.DYNAMIC })
  @IsEnum(PointsMode)
  mode: PointsMode;

  @ApiProperty({ example: 50, description: 'Order amount required to earn points' })
  @IsNumber()
  @Min(1)
  orderSpend: number;

  @ApiProperty({ example: 1, description: 'Points earned for given order spend' })
  @IsNumber()
  @Min(1)
  pointsEarned: number;

  @ApiProperty({
    example: true,
    description: 'Whether points are calculated after discount is applied',
  })
  @IsBoolean()
  applyAfterDiscount: boolean;
}
