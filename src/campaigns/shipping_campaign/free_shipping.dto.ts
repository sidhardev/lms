import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ShippingMethod } from '../enums/shipping_method.enum';
import { ApiProperty } from '@nestjs/swagger';
import {
  DiscountType,
  redemptionType,
  recurringCycle,
  recurringValidDays,
  userEligiblity,
  CampaignStatus,
} from 'src/campaigns/order-campaign/entites/discount-campaign.entity';

export class CreateFreeShippingDto {
  @IsString()
  @ApiProperty({
    example: 'Free shipping',
  })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Give users Free Shipping 2026 that increase our sales!',
  })
  description: string;

  @ApiProperty({ example: 'DRAFT' })
  @IsEnum(CampaignStatus)
  status: CampaignStatus;

  @ApiProperty({
    example: DiscountType.FREE_SHIPPING,
  })
  discountType: DiscountType;

  @ApiProperty({
    example: '2026-01-10T00:00:00.000Z',
    description: 'Campaign start date & time (ISO 8601 format)',
  })
  @IsDateString()
  startAt: Date;

  @ApiProperty({
    example: '2026-01-31T23:59:59.000Z',
    description: 'Campaign end date & time (ISO 8601 format)',
  })
  @IsDateString()
  endAt: Date;

  @ApiProperty({
    example: {
      message: 'Created For Free Shipping (OPTIONAL)',
    },
  })
  @IsOptional()
  metadata: Record<string, any>;

  @ApiProperty({
    example: ShippingMethod.STANDARD_SHIPPING,
  })
  @IsEnum(ShippingMethod)
  shippingMethod: ShippingMethod;

  @ApiProperty({
    example: 500,
  })
  @IsNumber()
  @Min(1)
  minOrderValue: number;

  @ApiProperty({
    example: 1000,
  })
  @IsNumber()
  @Min(1)
  maxDiscount: number;

  @ApiProperty({ example: ['India', 'USA'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  countries: string[];

  @ApiProperty({ example: ['Rajasthan'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  states: string[];

  @ApiProperty({ example: ['Jaipur'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  cities: string[];

  @ApiProperty({
    example: 100,
    description: 'Maximum number of times the campaign can be used',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  maxUses?: number;

  @ApiProperty({
    example: false,
    description: 'If true, campaign can be used unlimited times',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  unlimitedUses?: boolean;

  @ApiProperty({
    enum: redemptionType,
    example: redemptionType.INSTANTLY,
    description: 'Defines how the campaign can be redeemed',
    required: false,
  })
  @IsOptional()
  @IsEnum(redemptionType)
  redemptionType?: redemptionType;

  @ApiProperty({
    enum: userEligiblity,
    example: userEligiblity.NEW_USER,
    description: 'Which users are eligible for this campaign',
    required: false,
  })
  @IsOptional()
  @IsEnum(userEligiblity)
  userEligiblity?: userEligiblity;

  @ApiProperty({
    example: true,
    description: 'Whether the campaign has recurring validity',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  recurringValidity?: boolean;

  @ApiProperty({
    enum: recurringCycle,
    example: recurringCycle.EVERY_WEEK,
    description: 'Recurring cycle type (daily, weekly, monthly, etc.)',
    required: false,
  })
  @IsOptional()
  @IsEnum(recurringCycle)
  recurringCycle?: recurringCycle;

  @ApiProperty({
    enum: recurringValidDays,
    example: [recurringValidDays.MON, recurringValidDays.WED],
    description: 'Valid days for recurring campaigns',
    required: false,
  })
  @IsOptional()
  @IsEnum(recurringValidDays, { each: true })
  recurringValidDays?: recurringValidDays[];

  @ApiProperty({
    example: '09:00:00',
    description: 'Recurring start time (HH:mm:ss)',
    required: false,
  })
  @IsOptional()
  @IsString()
  recurringStartTime?: string;

  @ApiProperty({
    example: '21:00:00',
    description: 'Recurring end time (HH:mm:ss)',
    required: false,
  })
  @IsOptional()
  @IsString()
  recurringEndTime?: string;
}
