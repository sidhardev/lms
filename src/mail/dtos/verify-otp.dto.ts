import { IsEmail } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class VerifyOtpDto {
    @IsEmail()
    @ApiProperty({
        example: 'devsuthar065@gmail.com'
    })
    email: string;

    @ApiProperty({
        example: 123456
    })
    otp: number;

}