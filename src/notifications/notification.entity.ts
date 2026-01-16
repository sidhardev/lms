import { campaign } from 'src/campaigns/campaign.entity';
import { LoyaltyProgram } from 'src/loyalty-program/loyalty-program.entity';
import { Promotion } from 'src/promotion/promotion.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum NotificationChannel {
  SMS = 'SMS',
  WHATSAPP = 'WHATSAPP',
  PUSH = 'PUSH',
  EMAIL = 'EMAIL',
}

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
