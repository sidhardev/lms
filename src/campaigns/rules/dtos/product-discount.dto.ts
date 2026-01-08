import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";

export class ProductDiscountDto {

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
segments: Record<string, any>;




}