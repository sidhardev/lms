import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class BrandDiscountDto {
  @IsString()
  @ApiProperty({
    example: 'Jeans',
  })
  name: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    example: 3,
  })
  discountPercent: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    example: 3,
  })
  discountAmount: number;

  @IsNumber()
  @ApiProperty({
    example: 3,
  })
  minOrderValue: number;

  @IsNumber()
  @ApiProperty({
    example: 233,
  })
  maxDiscount: number;
}
