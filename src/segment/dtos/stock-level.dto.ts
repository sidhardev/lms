import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateStockLevelDto {
  @ApiProperty({ example: 'LOW' })
  @IsString()
  level: string;

  @ApiProperty({ example: 10 })
  @IsNumber()
  value: number;

  @ApiProperty({ example: 5 })
  @IsNumber()
  days: number;
}
