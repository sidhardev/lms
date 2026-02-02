import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { campaign } from "./discount-campaign.entity";

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
    upto: number;

    @Column()
    keepSameForAll: boolean;

    @ManyToOne(()=> campaign, (campaign) => campaign.categoryDiscount)
    discountCampaign: campaign;

}