import { ApiProperty } from "@nestjs/swagger";
import { membersCriteria } from "../enums/members.enum";
import { IsEnum } from "class-validator";
import { ComparisonOperator } from "../enums/comparison.enum";
import { Segmentopearotors } from "../enums/segment-opretaors.enum";

export class BirthdayMembersCriteria {
    @ApiProperty({
        example: membersCriteria.BIRTHDAY
    })
    @IsEnum(membersCriteria)
    event: membersCriteria;

    @ApiProperty({
        example: ComparisonOperator.IS
    })
    @IsEnum(ComparisonOperator)
    comparison: ComparisonOperator;

    @ApiProperty({
        example: Segmentopearotors.BETWEEN
    })
    @IsEnum(Segmentopearotors)
    operator: Segmentopearotors;

    @ApiProperty({
        example: new Date()

    })
    startDate: Date;

    @ApiProperty({
        example: new Date()


    })
    endDate: Date;  


}