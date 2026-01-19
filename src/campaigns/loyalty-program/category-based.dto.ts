import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CategoryBasedDto {
  @ApiProperty({ example: 'Electronics' })
  @IsString()
  categoryName: string;

  @ApiProperty({ example: 20 })
  @IsNumber()
  pointsEarned: number;
}