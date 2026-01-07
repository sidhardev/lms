import { IsNumber, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ApplyRewardDto {

    @IsNumber() 
    @ApiProperty({
        example: 200
    })
    orderAmount: number


    @IsOptional()
    @IsNumber()
    redeemPoints?: number

}