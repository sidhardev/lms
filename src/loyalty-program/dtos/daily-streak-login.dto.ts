import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, Min } from 'class-validator';
import { AccumulationRuleType } from '../enums/points.enum';

export class DailyLoginStreakDto {
  @ApiProperty({
    enum: AccumulationRuleType,
    example: AccumulationRuleType.DAILY_LOGIN_STREAK,
  })
  @IsEnum(AccumulationRuleType)
  ruleType: AccumulationRuleType;

  @ApiProperty({
    example: 5,
    description: 'Number of consecutive login days required',
  })
  @IsNumber()
  @Min(1)
  days: number;

  @ApiProperty({
    example: 50,
    description: 'Points rewarded after completing the streak',
  })
  @IsNumber()
  @Min(1)
  pointsEarned: number;
}
