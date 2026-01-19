import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Campaigns } from "./campaign.entity";
import { LoyaltyProgram } from "./loyalty-program/loyalty-program.entity";
import { campaign } from "./order-campaign/discount-campaign.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Campaigns, LoyaltyProgram, campaign])]
})

export class CampaignEntityModule {}