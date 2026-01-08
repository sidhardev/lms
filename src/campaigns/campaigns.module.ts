import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { campaign } from './campaign.entity';
import { CampaignsService } from './campaigns.service';
import { CampaignsController } from './campaigns.controller';
import { RulesService } from './rules/rules.service';

@Module({
    imports: [TypeOrmModule.forFeature([campaign])],
    providers: [CampaignsService, RulesService],
    controllers: [CampaignsController],
    exports: [CampaignsService]

})
export class CampaignsModule {}
