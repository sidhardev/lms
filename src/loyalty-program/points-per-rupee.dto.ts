import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class PointsPerRupeeDto {
  @ApiProperty({ example: 100 })
  @IsNumber()
  orderSpend: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  pointsEarned: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  applyAfterDiscount: boolean;
}