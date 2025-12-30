import { IsEmail } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SendMailDto {
    @IsEmail()
    @ApiProperty({
        example: 'dev@gmail.com'
    })
    email: string;

}