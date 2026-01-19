import { IsEnum } from 'class-validator';
import { CampaignStatus } from '../discount-campaign.entity';

export class UpdateCampaignStatusDto {
  @IsEnum(CampaignStatus)
  status: CampaignStatus;
}
