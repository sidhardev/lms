import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ApplyCouponDto {
  @ApiProperty({
    example: 'SUMMER21',
  })
  @IsString()
  couponCode?: string;

  @ApiProperty({
    example: 150.75,
  })
  cartTotal: number;
}
