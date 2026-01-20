import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { campaignType } from "./enums/campaign-type.enum";
import { IsEnum } from "class-validator";
import { LoyaltyProgram } from "./loyalty-program/entities/loyalty-program.entity";
import { campaign, CampaignStatus } from "./order-campaign/entites/discount-campaign.entity";
 
@Entity('campaign')

export class Campaigns {


    @PrimaryGeneratedColumn()
    id: number;

@Column()
name: string;

@Column({nullable: true})
description: string;

@Column()
@IsEnum(campaignType)
type: campaignType;

@OneToMany(() => LoyaltyProgram, (loyaltyProgram) => loyaltyProgram.campaign, {cascade: true})
loyaltyPrograms: LoyaltyProgram[];

@OneToMany(() => campaign, (discountCoupon) => discountCoupon.campaign, {cascade: true})
discountCoupons: campaign[];

@Column({nullable: true})
status: CampaignStatus;

@Column({nullable: true})
startAt: Date;

@Column({nullable: true})
endAt: Date;

}