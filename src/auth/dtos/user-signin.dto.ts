import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserSigninDto {
  @IsEmail()
  @ApiProperty({
    example: 'devsuthar065@gmail.com',
  })
  email: string;

  @IsString()
  @ApiProperty({
    example: 'password',
  })
  password: string;
}
