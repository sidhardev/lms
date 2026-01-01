import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCouponDto {
  @ApiProperty({
    example: 10,
  })
  discountValue?: number;

  @ApiProperty({
    example: 100,
  })
  minOrderValue?: number;

  @ApiProperty({
    example: 500,
  })
  maxDiscount?: number;

  @ApiProperty({
    example: true,
  })
  isAutoApply?: boolean;

  @ApiProperty({
    example: '2024-07-01T00:00:00Z',
  })
  startAt?: Date;

  @ApiProperty({
    example: '2024-07-31T23:59:59Z',
  })
  endAt?: Date;

  @ApiProperty({
    example: false,
  })
  isActive?: boolean;
}
