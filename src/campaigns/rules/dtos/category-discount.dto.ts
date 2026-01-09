import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNotEmpty } from "class-validator";
import { RuleType } from "../rules.enum";

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
})
@IsNotEmpty()
segments: Record<string, any>;

}