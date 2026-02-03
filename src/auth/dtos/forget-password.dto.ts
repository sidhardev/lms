import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class ForgetPasswordDto {
  @ApiProperty({
    example: 'mesidhar@gmail.com',
  })
  @IsEmail()
  email: string;
}
