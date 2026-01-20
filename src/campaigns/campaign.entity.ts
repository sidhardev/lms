import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { campaignType } from "./campaign-type.enum";
import { IsEnum } from "class-validator";
import { LoyaltyProgram } from "./loyalty-program/loyalty-program.entity";
import { campaign } from "./order-campaign/discount-campaign.entity";
 
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
startAt: Date;

@Column({nullable: true})
endAt: Date;

}