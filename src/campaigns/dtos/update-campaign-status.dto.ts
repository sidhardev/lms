import { IsEnum } from 'class-validator';
import { CampaignStatus } from '../campaign.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCampaignStatusDto {
  @IsEnum(CampaignStatus)
  @ApiProperty({
    example: 'ACTIVE',
  })
  status: CampaignStatus;
}
