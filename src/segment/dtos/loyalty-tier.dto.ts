import { ApiProperty } from "@nestjs/swagger";
import { membersCriteria } from "../enums/members.enum";
import { IsEnum } from "class-validator";
import { ComparisonOperator } from "../enums/comparison.enum";

export class LoyaltyTierOrTagsDto {
    @ApiProperty({
        example: membersCriteria.LOYALTY_TIER
    })
    @IsEnum(membersCriteria)
    event: membersCriteria;

    @ApiProperty({
        example: ComparisonOperator.IS
    })
    @IsEnum(ComparisonOperator)
    comparison: ComparisonOperator;


    @ApiProperty({
        example: "Gold"
    })
    value: string;


}