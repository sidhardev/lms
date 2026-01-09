import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/auth/guards/admin-guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dtos/create-campaign.dto';
import { UpdateCampaignStatusDto } from './dtos/update-campaign-status.dto';
import { CampaignStatus } from './campaign.entity';

@Controller('campaigns')
@ApiTags('Order Campaign')
// @UseGuards(JwtAuthGuard, AdminGuard)
// @ApiBearerAuth('access-token')
export class CampaignsController {
  constructor(private readonly campaignService: CampaignsService) {}
  @Post('/create')
  create(@Body() dto: CreateCampaignDto) {
    return this.campaignService.create(dto);
  }
  @Get('/all')
  findAll() {
    return this.campaignService.findAll();
  }

  @Get('/active')
  findActive() {
    return this.campaignService.findActive();
  }

  @Patch(':id/status')
  updateStatus(@Param('id', ParseIntPipe) id: number) {
    return this.campaignService.UpdateStatus(id);
  }
}
