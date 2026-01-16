import { DiscountType } from "src/campaigns/campaign.entity";
import { DiscountMode } from "src/campaigns/rules/rules.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('promotion')

export class Promotion {

    @PrimaryGeneratedColumn()
    id: number;

    @Column() 
    name: string;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column({
        type: 'simple-array',
    })
    selectedSegments: number[];

    @Column()
    discountType: DiscountMode;

    @Column()
    disocuntPercent: number;

    @Column()
    discountAmount: number;

    @Column()
    maxDiscount: number;




}