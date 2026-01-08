import { IsEnum, IsNumber, IsOptional, Min, Validate, validate, ValidateNested, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { DiscountMode, RuleType } from "../rules.enum";


@ValidatorConstraint({name: 'WholeCartValidation', async: false})
export class WholeCartValidation implements ValidatorConstraintInterface {

    validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
        const obj = validationArguments?.object as wholeCartDto;
        const hasPercent = obj.discoutPercent;
        const hasDiscount = obj.discountAmount;

        if(hasDiscount && hasPercent) return false;
        if (!hasDiscount && hasPercent) return false;

        return true;

        
    }
    defaultMessage(validationArguments?: ValidationArguments): string {
        return "You can Enter Only Discount Amount Or Discount Percent at a time! "
    }

}






export class wholeCartDto {
    @IsEnum(RuleType)
    ruleType: RuleType.WHOLE_CART

    @IsEnum(DiscountMode)
    discountMode: DiscountMode;

    @IsNumber()
    @IsOptional()
    @Min(1)
    discoutPercent: number;

    @IsNumber()
        @Min(1)
    @IsOptional()
    discountAmount: number;

    @IsNumber()
        @Min(1)
    MaxDiscount: number;


    @Validate(WholeCartValidation)
    private value: any;

}
