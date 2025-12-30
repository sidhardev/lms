import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserSigninDto {

    @IsEmail()
    @ApiProperty({
        example: 'dev@gmail.com'
    })
    email: string;

    @IsString()
    @ApiProperty({
        example: 'password'
    })
    password: string;

}