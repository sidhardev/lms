import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({
    example: 'Dev',
  })
  @IsString()
  firstname: string;

  @ApiProperty({
    example: 'Sidhar',
  })
  @IsString()
  lastname: string;

  @ApiProperty({
    example: 'dev@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password',
  })
  @IsString()
  @MinLength(6)
  password: string;
}
