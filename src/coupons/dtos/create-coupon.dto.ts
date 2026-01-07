// dto/create-coupon.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  IsNumber,
  IsBoolean,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateCouponDto {
  @ApiProperty({
    example: 'NEWYEAR50',
    description: 'Unique coupon code',
  })
  @IsString()
  code: string;

  @ApiProperty({
    example: 'ORDER',
    enum: ['ORDER'],
    description: 'Coupon type (currently only ORDER level supported)',
  })
  @IsEnum(['ORDER'])
  type: 'ORDER';

  @ApiProperty({
    example: 'PERCENT',
    enum: ['FLAT', 'PERCENT'],
    description: 'Discount calculation type',
  })
  @IsEnum(['FLAT', 'PERCENT'])
  discountType: 'FLAT' | 'PERCENT';

  @ApiProperty({
    example: 20,
    description: 'Discount value (percentage or flat amount)',
  })
  @IsNumber()
  discountValue: number;

  @ApiProperty({
    example: 500,
    description: 'Minimum order value required to apply coupon',
  })
  @IsNumber()
  minOrderValue: number;

  @ApiProperty({
    example: 200,
    required: false,
    description: 'Maximum discount amount (used mainly for PERCENT type)',
  })
  @IsOptional()
  @IsNumber()
  maxDiscountValue?: number;

  @ApiProperty({
    example: true,
    description: 'Whether coupon should auto-apply on eligible orders',
  })
  @IsBoolean()
  isAutoApply: boolean;



  @ApiProperty({
    example: 5,
    required: false,
    description: 'Maximum number of times a user can use the coupon',
  })
  @IsOptional()
  @IsNumber()
  perUserLimit: number;

  @ApiProperty({
    example: 100,
    required: false,
    description: 'Total usage limit for the coupon',
  })
  @IsOptional()
  @IsNumber()
  usageLimit: number;
}
