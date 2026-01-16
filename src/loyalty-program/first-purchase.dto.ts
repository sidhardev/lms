import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class FirstPurchaseDto {
  @ApiProperty({ example: 100 })
  @IsNumber()
  pointsEarned: number;
}