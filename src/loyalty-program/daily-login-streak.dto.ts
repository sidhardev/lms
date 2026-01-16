import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class DailyLoginStreakDto {
  @ApiProperty({ example: 7 })
  @IsNumber()
  days: number;

  @ApiProperty({ example: 50 })
  @IsNumber()
  pointsEarned: number;
}