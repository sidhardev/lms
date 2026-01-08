import { IsEnum, IsNumber, IsOptional, Min } from "class-validator";
import { DiscountMode, RuleType } from "../rules.enum";

export class BulkPurchaseDto {
    @IsEnum(RuleType)
    ruleType: RuleType.BULK_PURCHASE;

    @IsEnum(DiscountMode)
    mode: DiscountMode


    @IsNumber()
    @Min(1)
    minOrderValue: number;

    @IsNumber()
    @Min(1)
    minItems: number;

    @IsNumber()
    @Min(1)
    @IsOptional()
    discountAmount: number;

    @IsNumber()
    @IsOptional()
    discountPercent: number;








}