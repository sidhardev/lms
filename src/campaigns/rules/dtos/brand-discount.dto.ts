import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNotEmpty, ValidateNested } from "class-validator";
import { DiscountMode, RuleType } from "../rules.enum";
import { Type } from "class-transformer";

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
})
keepSameForAll: boolean;

@ApiProperty({
    enum: DiscountMode,
    example: DiscountMode.AMOUNT,
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
})
@IsNotEmpty()
brands: Record<string, any>;




}