import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNumber, IsEnum, IsNotEmpty } from "class-validator";
import { RuleType } from "../rules.enum";

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
})
@IsNotEmpty()
categories: Record<string, any>;








}