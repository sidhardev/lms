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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DiscountMode } from '../rules.enum';

@ValidatorConstraint({ name: 'cartTotalValidation', async: false })
export class CartTotalValidation implements ValidatorConstraintInterface {
  validate(_: any, args: ValidationArguments): boolean {
    const obj = args.object as CartCustomTotalDto;

    const hasPercent =
      obj.MinPercent !== undefined || obj.MaxPercent !== undefined;

    const hasAmount =
      obj.minAmount !== undefined || obj.maxAmount !== undefined;

    if (hasPercent && hasAmount) return false;

    if (!hasPercent && !hasAmount) return false;

    return true;
  }

  defaultMessage(args: ValidationArguments): string {
    const obj = args.object as CartCustomTotalDto;
    const hasPercent =
      obj.MinPercent !== undefined || obj.MaxPercent !== undefined;
    const hasAmount =
      obj.minAmount !== undefined || obj.maxAmount !== undefined;

    if (hasPercent && hasAmount) {
      return 'Cart Total: You must provide either PERCENT based values (MinPercent, MaxPercent) OR AMOUNT based values (minAmount, maxAmount), not both.';
    }

    if (!hasPercent && !hasAmount) {
      return 'Cart Total: You must provide either PERCENT based values (MinPercent, MaxPercent) or AMOUNT based values (minAmount, maxAmount).';
    }

    return 'Cart Total validation failed.';
  }
}

export class CartCustomTotalDto {
  @ApiProperty({
    enum: DiscountMode,
    example: DiscountMode.PERCENT,
    description: 'Discount mode',
  })
  @IsEnum(DiscountMode)
  mode: DiscountMode;

  @ApiProperty({
    example: 500,
    description: 'Minimum order value to apply the rule',
  })
  @IsNumber()
  @Min(1)
  minOrderValue: number;

  @ApiPropertyOptional({
    example: 5,
    description: 'Minimum discount percentage',
  })
  @IsNumber()
  @Min(1)
  @IsOptional()
  MinPercent?: number;

  @ApiPropertyOptional({
    example: 30,
    description: 'Maximum discount percentage',
  })
  @IsNumber()
  @Min(1)
  @IsOptional()
  MaxPercent?: number;

  @ApiPropertyOptional({
    example: 200,
    description: 'Maximum discount amount allowed for percentage mode',
  })
  @IsNumber()
  @Min(1)
  @IsOptional()
  MaxDiscount?: number;

  @ApiPropertyOptional({
    example: 50,
    description: 'Minimum flat discount amount',
  })
  @IsNumber()
  @Min(1)
  @IsOptional()
  minAmount?: number;

  @ApiPropertyOptional({
    example: 500,
    description: 'Maximum flat discount amount',
  })
  @IsNumber()
  @Min(1)
  @IsOptional()
  maxAmount?: number;

  @Validate(CartTotalValidation)
  private readonly _cartValidation!: any;
}
