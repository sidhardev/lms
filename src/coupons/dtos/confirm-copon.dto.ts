import { ApiProperty } from '@nestjs/swagger';

export class ConfirmCouponDto {
  @ApiProperty({
    example: 1,
  })
  couponId: number;

  @ApiProperty({
    example: 1,
  })
  orderId: number;

  @ApiProperty({
    example: 200,
  })
  discountAmont: number;
}
