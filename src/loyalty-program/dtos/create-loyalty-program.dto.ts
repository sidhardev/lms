import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { recurringValidDays } from '../../campaigns/campaign.entity';
import { CreateCampaignNotificationDto } from '../../notifications/dtos/createNotificationChannel.dto';
import { AccumulationRuleType } from '../enums/points.enum';
import { CategoryBasedDto } from './category-based.dto';
import { DailyLoginStreakDto } from './daily-streak-login.dto';
import { FirstPurchasePointsDto } from './first_purchase.dto';
import { PointsPerRupeeDto } from './points-per-ruppee.dto';

@ApiExtraModels(
  PointsPerRupeeDto,
  FirstPurchasePointsDto,
  DailyLoginStreakDto,
  CategoryBasedDto,
)
export class CreateLoyaltyProgramDto {
  @ApiProperty({ example: 'Gold Tier Program' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Rewards for gold members', required: false })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ example: '2026-01-01T00:00:00Z' })
  @IsDateString()
  startAt: string;

  @ApiProperty({ example: '2026-12-31T23:59:59Z' })
  @IsDateString()
  endAt: string;

  @ApiProperty({
    enum: recurringValidDays,
    example: [recurringValidDays.MON, recurringValidDays.WED],
  })
  @IsEnum(recurringValidDays, {each: true})
  validDays?: recurringValidDays[];

  @ApiProperty({ example: '09:00' })
  @IsString()
  validityStartTime: string;

  @ApiProperty({ example: '21:00' })
  @IsString()
  validityEndTime: string;

  @ApiProperty({
    oneOf: [
      { $ref: getSchemaPath(PointsPerRupeeDto) },
      { $ref: getSchemaPath(FirstPurchasePointsDto) },
      { $ref: getSchemaPath(DailyLoginStreakDto) },
      { $ref: getSchemaPath(CategoryBasedDto) },
    ],
  })
  @ValidateNested()
  @Type(() => PointsPerRupeeDto)
  @Type(() => FirstPurchasePointsDto)
  @Type(() => DailyLoginStreakDto)
  @Type(() => CategoryBasedDto)
  rules:
    | PointsPerRupeeDto
    | FirstPurchasePointsDto
    | DailyLoginStreakDto
    | CategoryBasedDto;

  @ApiProperty({ type: CreateCampaignNotificationDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateCampaignNotificationDto)
  notification?: CreateCampaignNotificationDto;
}