import {
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  IsDateString,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  validate,
  IsBoolean,
  Min,
  ValidateNested,
} from 'class-validator';
import { DiscountType, redemptionType, ruccringCycle, ruccringValidDays, userEligiblity } from '../campaign.entity';
import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { CouponRuleType } from 'src/coupons/admin/coupon-rule-type.enum';
import { CouponType } from 'src/coupons/admin/coupon-type.enum';
import { BrandDiscountDto } from '../rules/dtos/brand-discount.dto';
import { BulkPurchaseDto } from '../rules/dtos/bulk-purchase.dto';
import { CartCustomTotalDto } from '../rules/dtos/cart-total-custom.dto';
import { CategoryDiscountDto } from '../rules/dtos/category-discount.dto';
import { wholeCartDto } from '../rules/dtos/whole-cart.dto';
import { plainToClass, Type } from 'class-transformer';
import { RuleType } from '../rules/rules.enum';
import { ProductDiscountDto } from '../rules/dtos/product-discount.dto';
import { CreateCampaignNotificationDto } from 'src/notifications/dtos/createNotificationChannel.dto';

@ValidatorConstraint({ name: 'rulesValidation', async: true })
export class RulesValidation implements ValidatorConstraintInterface {
  async validate(_: any, args: ValidationArguments): Promise<boolean> {
    const obj = args.object as CreateCampaignDto;
    const rulesData = obj.rules;
    const ruleType = rulesData?.ruleType;
     
    if (!rulesData) return false;
    if (!ruleType) return false;

    let dtoClass: any;

    switch (ruleType) {
      case RuleType.WHOLE_CART:
        dtoClass = wholeCartDto;
        break;
      case RuleType.CART_TOTAL_CUSTOM:
        dtoClass = CartCustomTotalDto;
        break;
      case RuleType.BULK_PURCHASE:
        dtoClass = BulkPurchaseDto;
        break;
      case RuleType.CATEGORY:
        dtoClass = CategoryDiscountDto;
        break;
      case RuleType.PRODUCT:
        dtoClass = ProductDiscountDto;
        break;
      case RuleType.BRAND:
        dtoClass = BrandDiscountDto;
        break;
      default:
        return false;
    }

    const rulesInstance = plainToClass(dtoClass, rulesData);

    const errors = await validate(rulesInstance as object);

    // Store validation errors for error message
    if (errors.length > 0) {
      (args as any).validationErrors = errors;
    }

    return errors.length === 0;
  }

  defaultMessage(args: ValidationArguments): string {
    const rulesData = (args.object as CreateCampaignDto).rules;
    const ruleType = rulesData?.ruleType;
    const validationErrors = (args as any).validationErrors;

    if (!validationErrors || validationErrors.length === 0) {
      return `Rules validation failed for ruleType: ${ruleType}. Please ensure all required fields are provided with correct types.`;
    }

     const fieldErrors = validationErrors
      .map((error: any) => {
        const constraints = error.constraints
          ? Object.values(error.constraints)
          : [];
        return `${error.property}: ${constraints.join(', ')}`;
      })
      .join('; ');

    return `Rules validation failed for ${ruleType}. Details: ${fieldErrors}`;
  }
}

export class CreateCampaignDto {
  @IsString()
  @ApiProperty({
    example: 'Diwali Festive Offers 2026',
  })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Give users Diwali offer 2026 that increase our sales!',
  })
  description: string;

  @ApiProperty({
    example: DiscountType.ORDER_DISCOUNT,
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
      message: 'Created on diwali etc etc',
    },
  })
  @IsOptional()
  metadata: Record<string, any>;

  @ApiProperty({
    example: 'ORDER',
  })
  @IsEnum(CouponType)
  couponType: CouponType;

  @ApiProperty({
    example: true,
  })
  useItAsCoupon: boolean;

  @ApiProperty({
    example: true,
  })
  isActive: boolean;

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
  @Validate(RulesValidation)
  rules:
    | wholeCartDto
    | CartCustomTotalDto
    | BulkPurchaseDto
    | CategoryDiscountDto
    | ProductDiscountDto
    | BrandDiscountDto;


     @ApiProperty({
    example: 100,
    description: 'Maximum number of times the campaign can be used',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  maxUses?: number;

  @ApiProperty({
    example: false,
    description: 'If true, campaign can be used unlimited times',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  unlimitedUses?: boolean;

  @ApiProperty({
    enum: redemptionType,
    example: redemptionType.INSTANTLY,
    description: 'Defines how the campaign can be redeemed',
    required: false,
  })
  @IsOptional()
  @IsEnum(redemptionType
  )
  redemptionType?: redemptionType;

  @ApiProperty({
    enum: userEligiblity,
    example: userEligiblity.NEW_USER,
    description: 'Which users are eligible for this campaign',
    required: false,
  })
  @IsOptional()
  @IsEnum(userEligiblity)
  userEligiblity?: userEligiblity;

  @ApiProperty({
    example: true,
    description: 'Whether the campaign has recurring validity',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  ruccringValidity?: boolean;

  @ApiProperty({
    enum: ruccringCycle,
    example: ruccringCycle.EVERY_WEEK,
    description: 'Recurring cycle type (daily, weekly, monthly, etc.)',
    required: false,
  })
  @IsOptional()
  @IsEnum(ruccringCycle)
  ruccringCycle?: ruccringCycle;

  @ApiProperty({
    enum: ruccringValidDays,
    example: ruccringValidDays.MON,
    description: 'Valid days for recurring campaigns',
    required: false,
  })
  @IsOptional()
  @IsEnum(ruccringValidDays)
  ruccringValidDays?: ruccringValidDays;

  @ApiProperty({
    example: '09:00:00',
    description: 'Recurring start time (HH:mm:ss)',
    required: false,
  })
  @IsOptional()
  @IsString()
  ruccringStartTime?: string;

  @ApiProperty({
    example: '21:00:00',
    description: 'Recurring end time (HH:mm:ss)',
    required: false,
  })
  @IsOptional()
  @IsString()
  ruccringEndTime?: string;



  
 @ApiProperty({
    type: CreateCampaignNotificationDto,
    description: 'Single notification configuration for this campaign',
  })
  @ValidateNested()
  @Type(() => CreateCampaignNotificationDto)
  notification: CreateCampaignNotificationDto;
}
