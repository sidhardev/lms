import { ApiProperty } from '@nestjs/swagger';
import {  IsEnum, IsNumber, } from 'class-validator';
import { PurchaseFrequencyRule } from '../enums/purchase-frequency.enum';

export class CreatePurchaseFrequencyDto {
  @ApiProperty({ example: PurchaseFrequencyRule.HIGH_FREQUENCY })
  @IsEnum(PurchaseFrequencyRule)
  rule: PurchaseFrequencyRule;

  @ApiProperty({ example: 3 })
  @IsNumber()
  minPurchaseCount: number;

  @ApiProperty({ example: 30 })
  @IsNumber()
  days: number;
}
