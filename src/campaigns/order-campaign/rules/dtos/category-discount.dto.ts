import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { RuleType } from "../rules.enum";

export class categoryDiscountDto {
 


@IsString()
@ApiProperty({
    example: "Jeans"
})
name: string;

@IsNumber()
@IsOptional()
@ApiProperty({
    example: 3
})
discountPercent: number;

@IsNumber()
@IsOptional()
@ApiProperty({
    example: 3
})
discountAmount: number;

@IsNumber()     
@ApiProperty({
    example: 3
})
minOrderValue: number;

@IsNumber()
@ApiProperty({
    example: 233
})
maxDiscount: number;

 


}