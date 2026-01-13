import { campaign } from "src/campaigns/campaign.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

  // 🔑 owning side
  @OneToOne(() => campaign, (campaign) => campaign.notification, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  campaign: campaign;

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
