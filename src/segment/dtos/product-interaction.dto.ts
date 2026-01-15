import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ProductInteractionRule } from '../enums/product-interaction.enum';

export class CreateProductInteractionDto {
  @ApiProperty({
    example: ProductInteractionRule.ADDED_TO_CART_BUT_NOT_PURCHASED,
  })
  @IsEnum(ProductInteractionRule)
  rule: ProductInteractionRule;

  @ApiProperty({ example: 7 })
  @IsNumber()
  days: number;
}
