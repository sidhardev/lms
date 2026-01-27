import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  Validate,
} from 'class-validator';
import { RuleType } from '../rules.enum';

@ValidatorConstraint({ name: 'productDiscountValidation', async: false })
export class ProductDiscountValidation implements ValidatorConstraintInterface {
  validate(_: any, args: ValidationArguments): boolean {
    const obj = args.object as ProductDiscountDto;

    if (!obj.segments || Object.keys(obj.segments).length === 0) {
      return false;
    }

    return true;
  }

  defaultMessage(): string {
    return 'segments field is required and must contain at least one product segment with discount details (segmentName, percentage, minOrderValue, maxDiscount)';
  }
}

export class ProductDiscountDto {
  @ApiProperty({
    enum: RuleType,
    example: RuleType.PRODUCT,
    description: 'Rule type for product discount',
  })
  @IsEnum(RuleType)
  ruleType: RuleType.PRODUCT;

  @IsBoolean()
  @ApiProperty({
    example: false,
    description: 'Apply same discount to all product segments',
  })
  keepSameForAll: boolean;

  @ApiProperty({
    example: [
      {
        segmentName: 'MOST_PURCHASED',
        percentage: 20,
        minOrderValue: 500,
        maxDiscount: 100,
      },
    ],
    description:
      'Array of product segments with discount rules. Each item must have: segmentName, percentage, minOrderValue, maxDiscount',
  })
  @IsNotEmpty({
    message:
      'segments field cannot be empty. Provide at least one product segment with discount details.',
  })
  @Validate(ProductDiscountValidation)
  segments: Record<string, any>;
}
