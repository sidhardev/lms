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

@ValidatorConstraint({ name: 'bulkPurchaseValidation', async: false })
export class BulkPurchaseValidation implements ValidatorConstraintInterface {
  validate(_: any, args: ValidationArguments): boolean {
    const obj = args.object as BulkPurchaseDto;

    const hasAmount = obj.discountAmount !== undefined;
    const hasPercent = obj.discountPercent !== undefined;

    if (hasAmount && hasPercent) return false;

    if (!hasAmount && !hasPercent) return false;

    return true;
  }

  defaultMessage(args: ValidationArguments): string {
    const obj = args.object as BulkPurchaseDto;
    const hasAmount = obj.discountAmount !== undefined;
    const hasPercent = obj.discountPercent !== undefined;

    if (hasAmount && hasPercent) {
      return 'Bulk Purchase: You must provide either discountAmount OR discountPercent, not both. Remove one of them.';
    }

    if (!hasAmount && !hasPercent) {
      return 'Bulk Purchase: You must provide either discountAmount or discountPercent. At least one is required.';
    }

    return 'Bulk Purchase validation failed.';
  }
}

export class BulkPurchaseDto {
  @ApiProperty({
    enum: DiscountMode,
    example: DiscountMode.AMOUNT,
    description: 'Discount mode for bulk purchase',
  })
  @IsEnum(DiscountMode)
  discountMode: DiscountMode;

  @ApiProperty({
    example: 1000,
    description: 'Minimum cart value required to apply bulk purchase discount',
  })
  @IsNumber()
  @Min(1)
  minOrderValue: number;

  @ApiProperty({
    example: 5,
    description: 'Minimum number of items required for bulk purchase discount',
  })
  @IsNumber()
  @Min(1)
  minItems: number;

  @ApiPropertyOptional({
    example: 200,
    description: 'Flat discount amount for bulk purchase',
  })
  @IsNumber()
  @Min(1)
  @IsOptional()
  discountAmount: number;

  @ApiPropertyOptional({
    example: 10,
    description: 'Discount percentage for bulk purchase',
  })
  @IsNumber()
  @Min(1)
  @IsOptional()
  discountPercent: number;

  @Validate(BulkPurchaseValidation)
  private readonly _bulkValidation!: any;
}
