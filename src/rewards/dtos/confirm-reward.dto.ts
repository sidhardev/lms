import { IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ConfirmRewardDto{
    @ApiProperty({
        example: 5,
    })
    @IsNumber() 
    orderId: number

    @ApiProperty({
        example: 13
    }
    )
    @IsNumber() 
    redeemPoints: number
}