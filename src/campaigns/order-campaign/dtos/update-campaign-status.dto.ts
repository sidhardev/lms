import { IsEnum, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CampaignStatus } from '../entites/discount-campaign.entity';

export class UpdateCampaignStatusDto {
  @ApiPropertyOptional({
    enum: CampaignStatus,
    enumName: 'CampaignStatus',
  })
  @IsOptional()
  @IsEnum(CampaignStatus)
  status?: CampaignStatus;
}
