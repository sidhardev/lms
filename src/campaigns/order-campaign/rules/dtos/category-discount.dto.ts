import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class categoryDiscountDto {
@IsString()
name: string;

@IsNumber()
@IsOptional()
discountPercent: number;

@IsNumber()
@IsOptional()
discountAmount: number;

@IsNumber()
minOrderValue: number;

@IsNumber()
upto: number;

@IsBoolean()
keepSameForAll: boolean;


}