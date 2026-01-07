import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { campaign, CampaignStatus } from './campaign.entity';
import { Repository } from 'typeorm';
import { CreateCampaignDto } from './dtos/create-campaign.dto';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectRepository(campaign)
    private readonly CampaignRepository: Repository<campaign>,
  ) {}

  create(CreateCampaignDto: CreateCampaignDto) {
    const campaign = this.CampaignRepository.create({
      name: CreateCampaignDto.name,
      description: CreateCampaignDto.description,
      startAt: CreateCampaignDto.startAt,
      endAt: CreateCampaignDto.startAt,
      status: CampaignStatus.DRAFT,
      metadata: CreateCampaignDto.metadata,
    });
    return this.CampaignRepository.save(campaign);
  }

  findAll() {
    return this.CampaignRepository.find();
  }

  findOne(id: number) {
    return this.CampaignRepository.findOne({
      where: { id },
    });
  }

  async UpdateStatus(id: number, status: CampaignStatus) {
    const campaign = await this.findOne(id);
    if (!campaign) {
      throw new NotFoundException('Campaign Not found!');
    }

    campaign.status = status;
    return this.CampaignRepository.save(campaign);
  }
}
