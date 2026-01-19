import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
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
  @Get('/getAll')
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
  
    get(
      @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
      @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    ) {
      return this.campaignService.findAll(page, limit);
    }

  @Get('/active')
  findActive() {
    return this.campaignService.findActive();
  }

  @Patch(':id/status')
  updateStatus(@Param('id', ParseIntPipe) id: number) {
    return this.campaignService.UpdateStatus(id);
  }

  @Delete(':id')
  deleteById(@Param('id') id: number) {
    return this.campaignService.deleteById(id);
  }
}
