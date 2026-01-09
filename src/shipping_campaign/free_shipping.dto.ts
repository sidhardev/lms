import {
  IsArray,
  IsDateString,
  IsEnum,
  IsJSON,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { ShippingMethod } from './shipping_method.enum';
import { ApiProperty } from '@nestjs/swagger';
import { EligibleLocationDto } from './eligible_locations.dto';
import { Type } from 'class-transformer';
import { DiscountType } from 'src/campaigns/campaign.entity';
import { CouponType } from 'src/coupons/admin/coupon-type.enum';

export class CreateFreeShippingDto {
  @IsString()
  @ApiProperty({
    example: 'Free shipping',
  })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Give users Free Shipping 2026 that increase our sales!',
  })
  description: string;

  @ApiProperty({
    example: DiscountType.FREE_SHIPPING,
  })
  discountType: DiscountType;

  @ApiProperty({
    example: '2026-01-10T00:00:00.000Z',
    description: 'Campaign start date & time (ISO 8601 format)',
  })
  @IsDateString()
  startAt: Date;

  @ApiProperty({
    example: '2026-01-31T23:59:59.000Z',
    description: 'Campaign end date & time (ISO 8601 format)',
  })
  @IsDateString()
  endAt: Date;

  @ApiProperty({
    example: {
      message: 'Created For Free Shipping (OPTIONAL)',
    },
  })
  @IsOptional()
  metadata: Record<string, any>;

  @ApiProperty({
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    example: ShippingMethod.STANDARD_SHIPPING,
  })
  @IsEnum(ShippingMethod)
  shippingMethod: ShippingMethod;

  @ApiProperty({
    example: 500,
  })
  @IsNumber()
  @Min(1)
  minOrderValue: number;

  @ApiProperty({
    example: 1000,
  })
  @IsNumber()
  @Min(1)
  maxDiscount: number;

  @ApiProperty({
    type: [EligibleLocationDto],
    description: 'Geographic locations eligible for free shipping',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EligibleLocationDto)
  eligible_locations: EligibleLocationDto[];
}
