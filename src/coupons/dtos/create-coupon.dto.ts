// dto/create-coupon.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  IsNumber,
  IsBoolean,
  IsDateString,
  IsOptional,
  IsObject,
} from 'class-validator';
import { CouponRuleType } from '../coupon.entity';
import { Column } from 'typeorm';
import { CouponType } from '../admin/coupon-type.enum';



export class CreateCouponDto {

@ApiProperty({
  example: 'ORDER'
})
@IsEnum(CouponType)
couponType: CouponType;





  @ApiProperty({
    example: 'NEWYEAR50',
    description: 'Unique coupon code',
  })
  @IsString()
  code: string;

  @ApiProperty({
    example: 'PRODUCT',
    enum: [CouponRuleType],
    description: 'Coupon type ',
  })
  @IsEnum(CouponRuleType)
  ruleType: CouponRuleType;

  @ApiProperty({
    description: 'Raw rule configuration exactly as defined in Figma',
    example: {
      keepSameForAll: false,
      categories: [
        {
          categoryName: 'jeans',
          percentage: 20,
          minOrderValue: 500,
          maxDiscount: 100,
        },
      ],
    },
  })
  @IsObject()
  rules: Record<string, any>;
@ApiProperty({
    example: '2026-01-01T23:59:59Z',
    description: 'Coupon Start date (ISO format)',
  })
  @IsDateString()
  startAt: Date;

  @ApiProperty({
    example: '2026-01-20T23:59:59Z',
    description: 'Coupon end date (ISO format)',
  })
  @IsDateString()
  endAt: Date;
}
