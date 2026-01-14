import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min } from 'class-validator';

export class CategoryPointsItemDto {
  @ApiProperty({ example: 'jeans' })
  @IsString()
  categoryName: string;

  @ApiProperty({ example: 50 })
  @IsNumber()
  @Min(1)
  pointsEarned: number;
}
