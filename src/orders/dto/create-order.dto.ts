import { IsString, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDto {
    @IsNumber()
    @ApiProperty({
        example: 1000
    })
    amount: number;


}