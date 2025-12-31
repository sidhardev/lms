import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class ResetPasswordDto {
    @ApiProperty({
        example: 'dev@gmail.com'
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'Newpassword'
    })
    @IsString()
    password: string;

}