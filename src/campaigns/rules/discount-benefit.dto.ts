import { IsEnum, IsNumber, IsOptional, Min } from "class-validator";
import { DiscountMode } from "./rules.enum";

export class DiscountBenefitDto {
  @IsEnum(DiscountMode)
  mode: DiscountMode;

  @IsNumber()
  @Min(1)
  value: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  maxDiscount?: number;
}
