import { ApiProperty } from "@nestjs/swagger";
import { UserCriteria } from "../enums/user-criteria.enum";
import { ComparisonOperator } from "../enums/comparison.enum";
import { discountCriteriaTypes } from "../enums/discount.enum";
import { Segmentopearotors } from "../enums/segment-opretaors.enum";
import { IsOptional } from "class-validator";
export class DiscountCriteriaDto {

    @ApiProperty({
        example: UserCriteria.DISCOUNT_CRITERIA
    })
    criteria: UserCriteria.DISCOUNT_CRITERIA;

    @ApiProperty({
        example: discountCriteriaTypes.COUPON_USED
    })
    event: discountCriteriaTypes;

    @ApiProperty({
        example: ComparisonOperator.IS
    })
    comparison: ComparisonOperator;

    @ApiProperty({
        example: Segmentopearotors.GREATER_THEN
    })
    @IsOptional()
    operator: Segmentopearotors;

    @ApiProperty({
        example: 10

    })
    value: string | number;


}