import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { campaign, CampaignStatus, CampaignType } from './campaign.entity';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
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
      type: CreateCampaignDto.type,
      startAt: CreateCampaignDto.startAt,
      endAt: CreateCampaignDto.endAt,
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

  async UpdateStatus(id: number) {
    const campaign = await this.findOne(id);
    console.log(id)
    if (!campaign) {
      throw new NotFoundException('Campaign Not found!');
    }

    campaign.status = CampaignStatus.ACTIVE;
    return this.CampaignRepository.save(campaign);
  }
  async findActive() {
    const now = new Date();
    return this.CampaignRepository.find({

      where: {status: CampaignStatus.ACTIVE,
        
      }
    });
  }
}
 