import { IsEnum } from 'class-validator';
import { CampaignStatus } from '../campaign.entity';

export class UpdateCampaignStatusDto {
  @IsEnum(CampaignStatus)
  status: CampaignStatus;
}
