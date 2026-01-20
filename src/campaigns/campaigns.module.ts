import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Campaigns } from "./campaign.entity";
import { LoyaltyProgram } from "./loyalty-program/entities/loyalty-program.entity";
import { campaign } from "./order-campaign/entites/discount-campaign.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Campaigns, LoyaltyProgram, campaign])]
})

export class CampaignEntityModule {}