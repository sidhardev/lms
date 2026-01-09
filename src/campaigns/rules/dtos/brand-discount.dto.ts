import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNotEmpty, ValidateNested, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, Validate } from "class-validator";
import { DiscountMode, RuleType } from "../rules.enum";
import { Type } from "class-transformer";

@ValidatorConstraint({ name: 'brandDiscountValidation', async: false })
export class BrandDiscountValidation implements ValidatorConstraintInterface {
  validate(_: any, args: ValidationArguments): boolean {
    const obj = args.object as BrandDiscountDto;
    
    if (!obj.brands || Object.keys(obj.brands).length === 0) {
      return false;
    }
    
    return true;
  }

  defaultMessage(args: ValidationArguments): string {
    return 'brands field is required and must contain at least one brand with discount details (brandName, percentage, minOrderValue, maxDiscount)';
  }
}

export class BrandDiscountDto {

@ApiProperty({
    enum: RuleType,
    example: RuleType.BRAND,
    description: 'Rule type for brand discount',
  })
  @IsEnum(RuleType)
  ruleType: RuleType.BRAND;

@IsBoolean()
@ApiProperty({
    example: false,
    description: 'Apply same discount to all brands'
})
keepSameForAll: boolean;

@ApiProperty({
    enum: DiscountMode,
    example: DiscountMode.AMOUNT,
    description: 'Discount mode: AMOUNT (flat) or PERCENT (percentage)'
})
@IsEnum(DiscountMode)
discountMode: DiscountMode;


@ApiProperty({
    example: [
        {
          brandName: 'PUMA',
          percentage: 20,
          minOrderValue: 500,
          maxDiscount: 100,
        },
      ],
    description: 'Array of brands with discount rules. Each item must have: brandName, percentage, minOrderValue, maxDiscount'
})
@IsNotEmpty({ message: 'brands field cannot be empty. Provide at least one brand with discount details.' })
@Validate(BrandDiscountValidation)
brands: Record<string, any>;

}
