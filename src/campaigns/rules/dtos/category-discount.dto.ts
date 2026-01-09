import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNumber, IsEnum, IsNotEmpty, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, Validate } from "class-validator";
import { RuleType } from "../rules.enum";

@ValidatorConstraint({ name: 'categoryDiscountValidation', async: false })
export class CategoryDiscountValidation implements ValidatorConstraintInterface {
  validate(_: any, args: ValidationArguments): boolean {
    const obj = args.object as CategoryDiscountDto;
    
    if (!obj.categories || Object.keys(obj.categories).length === 0) {
      return false;
    }
    
    return true;
  }

  defaultMessage(args: ValidationArguments): string {
    return 'categories field is required and must contain at least one category with discount details (categoryName, percentage, minOrderValue, maxDiscount)';
  }
}

export class CategoryDiscountDto {

@ApiProperty({
    enum: RuleType,
    example: RuleType.CATEGORY,
    description: 'Rule type for category discount',
  })
  @IsEnum(RuleType)
  ruleType: RuleType.CATEGORY;

@IsBoolean()
@ApiProperty({
    example: false,
    description: 'Apply same discount to all categories'
})
keepSameForAll: boolean;

@ApiProperty({
    example: [
        {
          categoryName: 'jeans',
          percentage: 20,
          minOrderValue: 500,
          maxDiscount: 100,
        },
      ],
    description: 'Array of categories with discount rules. Each item must have: categoryName, percentage, minOrderValue, maxDiscount'
})
@IsNotEmpty({ message: 'categories field cannot be empty. Provide at least one category with discount details.' })
@Validate(CategoryDiscountValidation)
categories: Record<string, any>;








}