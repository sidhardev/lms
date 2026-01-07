import {
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { CampaignType } from '../campaign.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCampaignDto {
  @IsString()
  @ApiProperty({
    example: 'Diwali Festive Offers 2026',
  })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Give users Diwali offer 2026 that increase our sales!',
  })
  description: string;

   @ApiProperty({
    enum: CampaignType,
    example: CampaignType.ORDER_DISCOUNT,
    description: 'Type of campaign (e.g. ORDER, SIGNUP, REFERRAL)',
  })
  @IsEnum(CampaignType)
  type: CampaignType;

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
        message: 'Created on diwali etc etc'
    }
  })
  @IsOptional()
  metadata: Record<string, any>;
}
