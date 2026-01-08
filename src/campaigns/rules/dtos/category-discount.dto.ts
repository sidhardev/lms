import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNumber } from "class-validator";

export class CategoryDiscountDto {

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
categories: Record<string, any>;








}