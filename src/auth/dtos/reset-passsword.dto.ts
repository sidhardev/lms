import { IsEmail,  IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class ResetPasswordDto {
    @ApiProperty({
        example: 'mesidhar@gmail.com'
    })
    @IsEmail()
    email: string;
@ApiProperty({
    example: 'newpassword'
})
@IsString()
  @MinLength(6)
  newPassword: string;
    @ApiProperty({
        example: '2345'
    })
    @IsString()
    token: string;

}