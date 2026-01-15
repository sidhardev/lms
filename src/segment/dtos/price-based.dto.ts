import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreatePriceBasedDto {
  @ApiProperty({ example: 199 })
  @IsNumber()
  minPrice: number;

  @ApiProperty({ example: 999 })
  @IsNumber()
  maxPrice: number;
}
