import { DiscountType } from "src/campaigns/campaign.entity";
import { DiscountMode } from "src/campaigns/rules/rules.enum";
import { CampaignNotification } from "src/notifications/notification.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({nullable: true})
    disocuntPercent: number;

    @Column({nullable: true})
    discountAmount: number;

    @Column()
    maxDiscount: number;

      @OneToMany(
    () => CampaignNotification,
    (notification) => notification.promotion,
    { cascade: true, eager: true },
  )
  notifications: CampaignNotification[];




}