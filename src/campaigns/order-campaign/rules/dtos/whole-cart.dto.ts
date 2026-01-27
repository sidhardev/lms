import {
  IsEnum,
  IsNumber,
  IsOptional,
  Min,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DiscountMode, RuleType } from '../rules.enum';
import { ApiProperty } from '@nestjs/swagger';

@ValidatorConstraint({ name: 'WholeCartValidation', async: false })
export class WholeCartValidation implements ValidatorConstraintInterface {
  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> | boolean {
    const obj = validationArguments?.object as wholeCartDto;
    const hasPercent =
      obj.discoutPercent !== undefined && obj.discoutPercent !== null;
    const hasAmount =
      obj.discountAmount !== undefined && obj.discountAmount !== null;
    const discountMode = obj.discountMode;

    // If PERCENT mode is selected, only discoutPercent should be provided
    if (discountMode === DiscountMode.PERCENT) {
      return hasPercent && !hasAmount;
    }

    // If AMOUNT mode is selected, only discountAmount should be provided
    if (discountMode === DiscountMode.AMOUNT) {
      return hasAmount && !hasPercent;
    }

    return false;
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    const obj = validationArguments?.object as wholeCartDto;
    if (obj.discountMode === DiscountMode.PERCENT) {
      return 'For PERCENT discount mode, provide only discoutPercent, not discountAmount!';
    }
    if (obj.discountMode === DiscountMode.AMOUNT) {
      return 'For AMOUNT discount mode, provide only discountAmount, not discoutPercent!';
    }
    return 'Provide either discountAmount or discoutPercent based on the selected discountMode!';
  }
}

export class wholeCartDto {
  @ApiProperty({
    enum: RuleType,
    example: RuleType.WHOLE_CART,
    description: 'Rule type for whole cart discount',
  })
  @IsEnum(RuleType)
  ruleType: RuleType.WHOLE_CART;

  @ApiProperty({
    example: DiscountMode.AMOUNT,
  })
  @IsEnum(DiscountMode)
  discountMode: DiscountMode;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @ApiProperty({
    example: 20,
  })
  discoutPercent: number;

  @IsNumber()
  @Min(1)
  @IsOptional()
  @ApiProperty({
    example: 500,
  })
  discountAmount: number;

  @IsNumber()
  @ApiProperty({
    example: 1000,
  })
  @Min(1)
  MaxDiscount: number;

  @Validate(WholeCartValidation)
  private value: any;
}
