import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  Validate,
  ValidateNested,
} from 'class-validator';
import { recurringValidDays } from 'src/campaigns/campaign.entity';
import { IsLoyaltyProgramRule } from '../validators/loyalty-program-rules.validator';
import { AccumulationRuleType, PointsMode } from '../enums/points.enum';
import { Type } from 'class-transformer';
import { CreateCampaignNotificationDto } from 'src/notifications/dtos/createNotificationChannel.dto';

export class CreateLoyaltyProgramDto {
  @ApiProperty({
    example: 'Super Saver Loyalty Program',
    description: 'Name of the loyalty program',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: 'Earn points on every purchase and login',
    description: 'Optional description of the loyalty program',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: '2026-01-01T00:00:00Z',
    description: 'Loyalty program start date and time',
  })
  @IsDateString()
  startAt: Date;

  @ApiProperty({
    example: '2026-12-31T23:59:59Z',
    description: 'Loyalty program end date and time',
  })
  @IsDateString()
  endAt: Date;

  @ApiPropertyOptional({
    enum: recurringValidDays,
    example: recurringValidDays.MON,
    description: 'Days on which loyalty program is valid',
  })
  @IsOptional()
  @IsEnum(recurringValidDays)
  validDays?: recurringValidDays;

  @ApiPropertyOptional({
    example: '09:00',
    description: 'Daily validity start time (HH:mm)',
  })
  @IsOptional()
  @IsString()
  validityStartTime?: string;

  @ApiPropertyOptional({
    example: '22:00',
    description: 'Daily validity end time (HH:mm)',
  })
  @IsOptional()
  @IsString()
  validityEndTime?: string;

  @ApiPropertyOptional({
    examples: {
      POINTS_PER_RUPEE: {
        value: {
          ruleType: AccumulationRuleType.POINTS_PER_RUPEE,
          mode: PointsMode.DYNAMIC,
          orderSpend: 50,
          pointsEarned: 1,
          applyAfterDiscount: true,
        },
      },
      FIRST_PURCHASE: {
        value: {
          ruleType: AccumulationRuleType.FIRST_PURCHASE,
          pointsEarned: 100,
        },
      },
      DAILY_LOGIN_STREAK: {
        value: {
          ruleType: AccumulationRuleType.DAILY_LOGIN_STREAK,
          days: 5,
          pointsEarned: 50,
        },
      },
      CATEGORY_BASED: {
        value: {
          ruleType: AccumulationRuleType.CATEGORY_BASED,
          categories: [
            {
              categoryName: 'jeans',
              pointsEarned: 50,
            },
          ],
        },
      },
    },
    description: 'JSON configuration for loyalty rules',
  })
  @IsOptional()
  @Validate(IsLoyaltyProgramRule)
  rules?: Record<string, any>;

  @ApiProperty({
    type: CreateCampaignNotificationDto,
    description: 'Single notification configuration for this campaign',
  })
  @ValidateNested()
  @Type(() => CreateCampaignNotificationDto)
  notification: CreateCampaignNotificationDto;
}
