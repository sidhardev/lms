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
import { DiscountMode } from '../rules.enum';
import { ApiProperty } from '@nestjs/swagger';

@ValidatorConstraint({ name: 'WholeCartValidation', async: false })
export class WholeCartValidation implements ValidatorConstraintInterface {
  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> | boolean {
    const obj = validationArguments?.object as wholeCartDto;
    const hasPercent =
      obj.discountPercent !== undefined && obj.discountPercent !== null;
    const hasAmount =
      obj.discountAmount !== undefined && obj.discountAmount !== null;
    const discountMode = obj.discountMode;

    if (discountMode === DiscountMode.PERCENT) {
      return hasPercent && !hasAmount;
    }

    if (discountMode === DiscountMode.AMOUNT) {
      return hasAmount && !hasPercent;
    }

    return false;
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    const obj = validationArguments?.object as wholeCartDto;
    if (obj.discountMode === DiscountMode.PERCENT) {
      return 'For PERCENT discount mode, provide only discountPercent, not discountAmount!';
    }
    if (obj.discountMode === DiscountMode.AMOUNT) {
      return 'For AMOUNT discount mode, provide only discountAmount, not discountPercent!';
    }
    return 'Provide either discountAmount or discountPercent based on the selected discountMode!';
  }
}

export class wholeCartDto {
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
  discountPercent: number;

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
