import { campaign } from 'src/campaigns/order-campaign/entites/discount-campaign.entity';
import { LoyaltyProgram } from 'src/campaigns/loyalty-program/entities/loyalty-program.entity';
import { Promotion } from 'src/promotion/entites/promotion.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NotificationChannel } from '../enums/notification-channel.enum';



@Entity('campaign_notifications')
export class CampaignNotification {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => campaign, (campaign) => campaign.notifications, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  campaign?: campaign;

  @ManyToOne(() => Promotion, (promotion) => promotion.notifications, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  promotion?: Promotion;



  @OneToOne(
    () => LoyaltyProgram,
    (loyaltyProgram) => loyaltyProgram.notification,
    {
      onDelete: 'CASCADE',
      nullable: true,
    },
  )
  @JoinColumn()
  loyaltyProgram?: LoyaltyProgram;

  @Column({ type: 'enum', enum: NotificationChannel })
  channel: NotificationChannel;

  @Column()
  title: string;

  @Column('text')
  body: string;

  @Column({ nullable: true })
  bannerImageUrl?: string;

  @Column({ nullable: true })
  ctaText?: string;

  @Column({ nullable: true })
  ctaLink?: string;

  @CreateDateColumn()
  createdAt: Date;
}
