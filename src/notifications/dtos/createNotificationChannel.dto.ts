import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { NotificationChannel } from '../notification.entity';

export class CreateCampaignNotificationDto {
  @ApiProperty({
    enum: NotificationChannel,
    example: NotificationChannel.WHATSAPP,
    description: 'Notification channel for this campaign',
  })
  @IsEnum(NotificationChannel)
  channel: NotificationChannel;

  @ApiProperty({
    example: 'Diwali Dhamaka Sale',
    description: 'Notification title',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Extra ₹500 OFF on purchase above ₹3000!',
    description: 'Main notification content/message',
  })
  @IsString()
  body: string;

  @ApiPropertyOptional({
    example: 'https://cdn.com/diwali-banner.png',
    description: 'Banner image URL (optional)',
  })
  @IsOptional()
  @IsString()
  bannerImageUrl?: string;

  @ApiPropertyOptional({
    example: 'Apply Now',
    description: 'CTA button text',
  })
  @IsOptional()
  @IsString()
  ctaText?: string;

  @ApiPropertyOptional({
    example: 'https://loyaltynotification.com',
    description: 'CTA redirect URL',
  })
  @IsOptional()
  @IsString()
  ctaLink?: string;
}
