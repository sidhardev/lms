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
  IsArray,
} from 'class-validator';
import {
  DiscountType,
  redemptionType,
  recurringCycle,
  recurringValidDays,
  userEligiblity,
} from '../entites/discount-campaign.entity';
import { ApiProperty } from '@nestjs/swagger';
import { BulkPurchaseDto } from '../rules/dtos/bulk-purchase.dto';
import { CartCustomTotalDto } from '../rules/dtos/cart-total-custom.dto';
import { wholeCartDto } from '../rules/dtos/whole-cart.dto';
import { plainToClass, Type } from 'class-transformer';
import { RuleType } from '../rules/rules.enum';
import { CreateCampaignNotificationDto } from 'src/notifications/dtos/createNotificationChannel.dto';
import { ShippingMethod } from 'src/campaigns/enums/shipping_method.enum';
import { categoryDiscountDto } from '../rules/dtos/category-discount.dto';
import { ProductDiscountDto } from '../rules/dtos/product-discount.dto';
import { BrandDiscountDto } from '../rules/dtos/brand-discount.dto';

@ValidatorConstraint({ name: 'rulesValidation', async: true })
export class RulesValidation implements ValidatorConstraintInterface {
  async validate(_: any, args: ValidationArguments): Promise<boolean> {
    const obj = args.object as CreateCampaignDto;
    const rulesData = obj;
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
      case RuleType.CATEGORY_DISCOUNT:
        dtoClass = categoryDiscountDto;
        break;
      case RuleType.PRODUCT_DISCOUNT:
        dtoClass = ProductDiscountDto;

      default:
        return false;
    }

    const rulesInstance = plainToClass(dtoClass, rulesData);

    const errors = await validate(rulesInstance as object);

    if (errors.length > 0) {
      (args as any).validationErrors = errors;
    }

    return errors.length === 0;
  }

  defaultMessage(args: ValidationArguments): string {
    const rulesData = args.object as CreateCampaignDto;
    const ruleType = rulesData.ruleType;
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

@ValidatorConstraint({ name: 'IsOnlyOneRuleProvided', async: false })
export class IsOnlyOneRuleProvided implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const obj = args.object as CreateCampaignDto;
    const { ruleType } = obj;

    const ruleMapping = {
      [RuleType.WHOLE_CART]: 'wholeCart',
      [RuleType.BULK_PURCHASE]: 'bulkPurchase',
      [RuleType.CART_TOTAL_CUSTOM]: 'cartTotalCustom',
      [RuleType.CATEGORY_DISCOUNT]: 'categoryDiscount',
      [RuleType.PRODUCT_DISCOUNT]: 'productDiscount',
      [RuleType.BRAND_DISCOUNT]: 'brandDiscount',
    };

    const allRuleProperties = Object.values(ruleMapping);
    const expectedProperty = ruleMapping[ruleType];

    if (!expectedProperty) {
      return false;
    }

    const providedRules = allRuleProperties.filter(
      (prop) => obj[prop] !== undefined && obj[prop] !== null,
    );

    return providedRules.length === 1 && providedRules[0] === expectedProperty;
  }

  defaultMessage(args: ValidationArguments) {
    const obj = args.object as CreateCampaignDto;
    const { ruleType } = obj;

    const ruleMapping = {
      [RuleType.WHOLE_CART]: 'wholeCart',
      [RuleType.BULK_PURCHASE]: 'bulkPurchase',
      [RuleType.CART_TOTAL_CUSTOM]: 'cartTotalCustom',
      [RuleType.CATEGORY_DISCOUNT]: 'categoryDiscount',
      [RuleType.PRODUCT_DISCOUNT]: 'productDiscount',
      [RuleType.BRAND_DISCOUNT]: 'brandDiscount',
    };

    const expectedProperty = ruleMapping[ruleType];

    if (!ruleType || !expectedProperty) {
      return `A valid ruleType must be provided.`;
    }

    const providedRules = Object.values(ruleMapping).filter(
      (prop) => obj[prop] !== undefined && obj[prop] !== null,
    );

    if (providedRules.length !== 1 || providedRules[0] !== expectedProperty) {
      return `For ruleType '${ruleType}', exactly one rule property ('${expectedProperty}') must be provided. Received: ${providedRules.join(', ') || 'none'}.`;
    }

    return 'Invalid rule configuration.';
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
  @IsEnum(DiscountType)
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
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  useItAsCoupon: boolean;

  @ApiProperty({
    example: RuleType.CATEGORY_DISCOUNT,
  })
  @IsEnum(RuleType)
  ruleType: RuleType;

  @ApiProperty({})
  @IsOptional()
  @ValidateNested()
  @Type(() => wholeCartDto)
  wholeCart: wholeCartDto;

  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => BulkPurchaseDto)
  bulkPurchase: BulkPurchaseDto;

  @IsOptional()
  @ValidateNested()
  @ApiProperty()
  @Type(() => CartCustomTotalDto)
  cartTotalCustom: CartCustomTotalDto;

  @IsOptional()
  @IsArray()
  @ApiProperty({
    type: [categoryDiscountDto],
    example: [
      {
        name: 'Jeans',
        discountPercent: 10,
        minOrderValue: 500,
        maxDiscount: 100,
      },
      {
        name: 'Shirts',
        discountAmount: 50,
        minOrderValue: 1000,
        maxDiscount: 50,
      },
    ],
  })
  @ValidateNested({ each: true })
  @Type(() => categoryDiscountDto)
  categoryDiscount: categoryDiscountDto[];

  @IsOptional()
  @IsArray()
  @ApiProperty({
    type: [ProductDiscountDto],
    example: [
      {
        name: 'MOST_PURCHASED',
        discountPercent: 10,
        minOrderValue: 500,
        maxDiscount: 100,
      },
      {
        name: 'NOT_SOLD',
        discountAmount: 50,
        minOrderValue: 1000,
        maxDiscount: 50,
      },
    ],
  })
  @ValidateNested({ each: true })
  @Type(() => ProductDiscountDto)
  productDiscount: ProductDiscountDto[];

  @IsOptional()
  @IsArray()
  @ApiProperty({
    type: [BrandDiscountDto],
    example: [
      {
        name: 'PUMA',
        discountPercent: 10,
        minOrderValue: 500,
        maxDiscount: 100,
      },
      {
        name: 'ADIDAS',
        discountAmount: 50,
        minOrderValue: 1000,
        maxDiscount: 50,
      },
    ],
  })
  @ValidateNested({ each: true })
  @Type(() => BrandDiscountDto)
  brandDiscount: BrandDiscountDto[];

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
  @IsEnum(redemptionType)
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
  recurringValidity?: boolean;

  @ApiProperty({
    enum: recurringCycle,
    example: recurringCycle.EVERY_WEEK,
    description: 'Recurring cycle type (daily, weekly, monthly, etc.)',
    required: false,
  })
  @IsOptional()
  @IsEnum(recurringCycle)
  recurringCycle?: recurringCycle;

  @ApiProperty({
    example: [recurringValidDays.MON, recurringValidDays.WED],
    description: 'Valid days for recurring campaigns',
    required: false,
  })
  @IsOptional()
  @IsEnum(recurringValidDays, { each: true })
  recurringValidDays?: recurringValidDays[];

  @ApiProperty({
    example: '09:00:00',
    description: 'Recurring start time (HH:mm:ss)',
    required: false,
  })
  @IsOptional()
  @IsString()
  recurringStartTime?: string;

  @ApiProperty({
    example: '21:00:00',
    description: 'Recurring end time (HH:mm:ss)',
    required: false,
  })
  @IsOptional()
  @IsString()
  recurringEndTime?: string;

  @ApiProperty({
    type: [CreateCampaignNotificationDto],
    description: 'Notification configurations for this campaign',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCampaignNotificationDto)
  notifications: CreateCampaignNotificationDto[];

  @IsOptional()
  @IsEnum(ShippingMethod)
  shippingMethod: ShippingMethod;

  @IsOptional()
  @IsNumber()
  minOrderValue?: number;

  @IsOptional()
  @IsNumber()
  maxDiscount?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  countries?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  states?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  cities?: string[];

  @Validate(IsOnlyOneRuleProvided)
  private readonly _ruleValidation: any;
}
