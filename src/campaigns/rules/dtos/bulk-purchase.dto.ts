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
import { DiscountMode, RuleType } from '../rules.enum';

/* -------------------- CUSTOM VALIDATOR -------------------- */

@ValidatorConstraint({ name: 'bulkPurchaseValidation', async: false })
export class BulkPurchaseValidation
  implements ValidatorConstraintInterface
{
  validate(_: any, args: ValidationArguments): boolean {
    const obj = args.object as BulkPurchaseDto;

    const hasAmount = obj.discountAmount !== undefined;
    const hasPercent = obj.discountPercent !== undefined;

    // ❌ both provided
    if (hasAmount && hasPercent) return false;

    // ❌ none provided
    if (!hasAmount && !hasPercent) return false;

    return true;
  }

  defaultMessage(): string {
    return 'Provide either discountAmount or discountPercent, not both.';
  }
}

/* -------------------- DTO -------------------- */

export class BulkPurchaseDto {
  @ApiProperty({
    enum: RuleType,
    example: RuleType.BULK_PURCHASE,
    description: 'Rule type for bulk purchase discount',
  })
  @IsEnum(RuleType)
  ruleType: RuleType.BULK_PURCHASE;

  @ApiProperty({
    enum: DiscountMode,
    example: DiscountMode.AMOUNT,
    description: 'Discount mode for bulk purchase',
  })
  @IsEnum(DiscountMode)
  mode: DiscountMode;

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
  discountAmount?: number;

  @ApiPropertyOptional({
    example: 10,
    description: 'Discount percentage for bulk purchase',
  })
  @IsNumber()
  @Min(1)
  @IsOptional()
  discountPercent?: number;

  /* -------- Cross-field validation -------- */
  @Validate(BulkPurchaseValidation)
  private readonly _bulkValidation!: any;
}
