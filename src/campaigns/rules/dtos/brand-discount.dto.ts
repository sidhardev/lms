import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum } from "class-validator";
import { DiscountMode } from "../rules.enum";

export class BrandDiscountDto {

@IsBoolean()
@ApiProperty({
    example: false,
})
keepSameForAll: boolean;

@ApiProperty({
    example: 'AMOUNT',
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
brands: Record<string, any>;




}