import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { campaign } from "./discount-campaign.entity";
import { RuleType } from "../rules/rules.enum";

@Entity('category-discount')
export class categoryDiscount {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({

        nullable: true
    })
    discountPercent: number;

  

    @Column({nullable: true})
    discountAmount: number;

    @Column()
    minOrderValue: number;

    @Column() 
    maxDiscount: number;

 

    @ManyToOne(()=> campaign, (campaign) => campaign.categoryDiscount)
    discountCampaign: campaign;

}