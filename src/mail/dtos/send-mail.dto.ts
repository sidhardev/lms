import { IsEmail } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SendMailDto {
    @IsEmail()
    @ApiProperty({
        example: 'devsuthar065@gmail.com'
    })
    email: string;

}