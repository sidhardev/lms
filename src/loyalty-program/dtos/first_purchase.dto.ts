 
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, Min } from 'class-validator';
import { AccumulationRuleType } from '../enums/points.enum';

export class FirstPurchasePointsDto {
  @ApiProperty({ enum: AccumulationRuleType, example: AccumulationRuleType.FIRST_PURCHASE })
  @IsEnum(AccumulationRuleType)
  ruleType: AccumulationRuleType.FIRST_PURCHASE;

  @ApiProperty({ example: 100, description: 'Points given on first successful purchase' })
  @IsNumber()
  @Min(1)
  pointsEarned: number;
}
