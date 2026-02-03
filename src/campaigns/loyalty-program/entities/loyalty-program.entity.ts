import { recurringValidDays } from 'src/campaigns/enums/campaign.enums';
import { CampaignNotification } from 'src/notifications/entities/notification.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PointsPerRupee } from './points-per-rupee.entity';
import { FirstPurchase } from './first-purchase.entity';
import { DailyLoginStreak } from './daily-login-streak.entity';
import { CategoryBased } from './category-based.entity';
import { Campaigns } from '../../campaign.entity';

@Entity('loyalty-program')
export class LoyaltyProgram {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Campaigns, (campaigns) => campaigns.loyaltyPrograms, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'campaignId' })
  campaign: Campaigns;

  @Column({ type: 'timestamp', nullable: true })
  startAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  endAt: Date;

  @OneToOne(
    () => CampaignNotification,
    (notification) => notification.loyaltyProgram,
    { cascade: true,  },
  )
  notification: CampaignNotification;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    type: 'enum',
    enum: recurringValidDays,
    array: true,
    nullable: true,
  })
  validDays: recurringValidDays[];

  @Column()
  validityStartTime: string;

  @Column()
  validityEndTime: string;

  @OneToOne(() => PointsPerRupee, (rule) => rule.loyaltyProgram, {
    cascade: true,
    eager: true,
  })
  pointsPerRupee: PointsPerRupee;

  @OneToOne(() => FirstPurchase, (rule) => rule.loyaltyProgram, {
    cascade: true,
    eager: true,
  })
  firstPurchase: FirstPurchase;

  @OneToOne(() => DailyLoginStreak, (rule) => rule.loyaltyProgram, {
    cascade: true,
    eager: true,
  })
  dailyLoginStreak: DailyLoginStreak;

  @OneToMany(() => CategoryBased, (rule) => rule.loyaltyProgram, {
    cascade: true,
    eager: true,
  })
  categoryBased: CategoryBased[];
}
