import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateProductInteractionDto {
  @ApiProperty({ example: 'VIEWED_PRODUCT' })
  @IsString()
  pattern: string;

  @ApiProperty({ example: 7 })
  @IsNumber()
  days: number;
}
