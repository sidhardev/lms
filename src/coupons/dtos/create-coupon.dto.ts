// dto/create-coupon.dto.ts
import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  IsNumber,
  IsBoolean,
  IsDateString,
  IsOptional,
  IsObject,
} from 'class-validator';
import { Column } from 'typeorm';
import { CouponType } from '../admin/coupon-type.enum';
import {
  wholeCartDto,
  WholeCartValidation,
} from 'src/campaigns/order-campaign/rules/dtos/whole-cart.dto';
import { CartCustomTotalDto } from 'src/campaigns/order-campaign/rules/dtos/cart-total-custom.dto';
import { BulkPurchaseDto } from 'src/campaigns/order-campaign/rules/dtos/bulk-purchase.dto';
import { CategoryDiscountDto } from 'src/campaigns/order-campaign/rules/dtos/category-discount.dto';
import { ProductDiscountDto } from 'src/campaigns/order-campaign/rules/dtos/product-discount.dto';
import { BrandDiscountDto } from 'src/campaigns/order-campaign/rules/dtos/brand-discount.dto';
import { CouponRuleType } from '../admin/coupon-rule-type.enum';
@ApiExtraModels(
  wholeCartDto,
  CartCustomTotalDto,
  BulkPurchaseDto,
  CategoryDiscountDto,
  ProductDiscountDto,
  BrandDiscountDto,
)
export class CreateCouponDto {
  @ApiProperty({
    example: 'ORDER',
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
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    enum: CouponRuleType,
    default: CouponRuleType.WHOLE_CART,
  })
  ruleType: CouponRuleType;

  @ApiProperty({
    oneOf: [
      { $ref: getSchemaPath(wholeCartDto) },
      { $ref: getSchemaPath(CartCustomTotalDto) },
      { $ref: getSchemaPath(BulkPurchaseDto) },
      { $ref: getSchemaPath(CategoryDiscountDto) },
      { $ref: getSchemaPath(ProductDiscountDto) },
      { $ref: getSchemaPath(BrandDiscountDto) },
    ],
    discriminator: {
      propertyName: 'ruleType',
      mapping: {
        WHOLE_CART: getSchemaPath(wholeCartDto),
        CART_TOTAL: getSchemaPath(CartCustomTotalDto),
        BULK: getSchemaPath(BulkPurchaseDto),
        CATEGORY: getSchemaPath(CategoryDiscountDto),
        PRODUCT: getSchemaPath(ProductDiscountDto),
        BRAND: getSchemaPath(BrandDiscountDto),
      },
    },
  })
  rules:
    | wholeCartDto
    | CartCustomTotalDto
    | BulkPurchaseDto
    | CategoryDiscountDto
    | ProductDiscountDto
    | BrandDiscountDto;

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
