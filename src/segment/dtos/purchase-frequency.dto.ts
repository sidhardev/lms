import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreatePurchaseFrequencyDto {
  @ApiProperty({ example: 'REPEAT_CUSTOMER' })
  @IsString()
  type: string;

  @ApiProperty({ example: 3 })
  @IsNumber()
  minPurchaseCount: number;

  @ApiProperty({ example: 30 })
  @IsNumber()
  days: number;
}
