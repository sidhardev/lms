import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/auth/guards/admin-guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dtos/create-campaign.dto';
import { UpdateCampaignStatusDto } from './dtos/update-campaign-status.dto';

@Controller('campaigns')
@ApiTags('Admin Campaigns')
@UseGuards(JwtAuthGuard, AdminGuard)
@ApiBearerAuth('access-token')
export class CampaignsController {
  constructor(private readonly campaignService: CampaignsService) {}
  @Post()
  create(@Body() dto: CreateCampaignDto) {
   return this.campaignService.create(dto);
  }
  @Get() 
  findAll() {
    return this.campaignService.findAll();
  }
  @Patch(':id/status')
  updateStatus(@Param('id') id: number, dto: UpdateCampaignStatusDto) {
   return this.campaignService.UpdateStatus(id,dto.status);
  }
}
