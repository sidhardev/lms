import { IsEnum, IsNumber, IsOptional, Min, Validate, validate, ValidateNested, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { DiscountMode, RuleType } from "../rules.enum";
import { ApiProperty } from "@nestjs/swagger";


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


    @ApiProperty(
        {
            example: DiscountMode.AMOUNT
        }
    )
    @IsEnum(DiscountMode)
    discountMode: DiscountMode;

    @IsNumber()
    @IsOptional()
    @Min(1)
    @ApiProperty({
        example: 20,
    })
    discoutPercent: number;

    @IsNumber()
        @Min(1)
    @IsOptional()
    @ApiProperty({
        example: 500,
    })
    discountAmount: number;

    @IsNumber()
    @ApiProperty({
        example: 1000
    })
        @Min(1)
    MaxDiscount: number;


    @Validate(WholeCartValidation)
    private value: any;

}
