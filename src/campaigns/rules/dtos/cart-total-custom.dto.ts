import { IsEnum, isEnum, IsNumber, IsOptional, Min } from "class-validator";
import { DiscountMode, RuleType } from "../rules.enum";

export class CartCustomTotalDto {
    @IsEnum(RuleType)
    ruleType: RuleType.CART_TOTAL_CUSTOM

    @IsEnum(DiscountMode)
    mode: DiscountMode;

    @IsNumber()
    @Min(1)
    minOrderValue: number;

    @IsNumber()
    @Min(1)
    @IsOptional()       
    MinPercent: number;

    @IsNumber()
    @IsOptional()
    @Min(1)
    MaxPercent: number;

    @IsNumber()
    @Min(1)
    @IsOptional()
    MaxDiscount: number;

    @IsNumber()
    @Min(1)
    @IsOptional()
    minAmount: number;

    @IsNumber()
    @Min(1)
    @IsOptional()
    maxAmount: number;








}
