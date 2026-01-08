import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { campaign } from './campaign.entity';
import { CampaignsService } from './campaigns.service';
import { CampaignsController } from './campaigns.controller';

@Module({
    imports: [TypeOrmModule.forFeature([campaign])],
    providers: [CampaignsService, ],
    controllers: [CampaignsController],
    exports: [CampaignsService]

})
export class CampaignsModule {}
