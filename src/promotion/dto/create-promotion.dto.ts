import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ArrayNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { DiscountMode } from 'src/order-campaign/rules/rules.enum';
import { CreateCampaignNotificationDto } from 'src/notifications/dtos/createNotificationChannel.dto';

export class CreatePromotionDto {
  @ApiProperty({
    example: 'New Year Sale',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '2026-01-01T00:00:00Z',
  })
  @IsDateString()
  startDate: Date;

  @ApiProperty({
    example: '2026-01-31T23:59:59Z',
  })
  @IsDateString()
  endDate: Date;

  @ApiProperty({
    example: [1, 2, 3],
    description: 'Array of selected segment IDs',
    type: [Number],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  selectedSegments: number[];

  @ApiProperty({
    enum: DiscountMode,
    example: DiscountMode.PERCENT,
  })
  @IsEnum(DiscountMode)
  discountType: DiscountMode;

  @ApiProperty({
    example: 20,
    description: 'Discount percentage',
  })
  @IsNumber()
  disocuntPercent: number;

  @ApiProperty({
    example: 500,
    description: 'Flat discount amount',
  })
  @IsOptional()
  @IsNumber()
  discountAmount: number;

  @ApiProperty({
    example: 1000,
    description: 'Maximum discount cap',
  })
  @IsOptional()
  @IsNumber()
  maxDiscount: number;


   @ApiProperty({
      type: [CreateCampaignNotificationDto],
      description: 'Notification configurations for this campaign',
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateCampaignNotificationDto)
    notifications: CreateCampaignNotificationDto[];
}
