import { IsObject, IsOptional } from "class-validator";
import { recurringValidDays } from "src/campaigns/campaign.entity";
import { CampaignNotification } from "src/notifications/notification.entity";
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('loyalty-program')
export class LoyaltyProgram {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;


    @Column()
    @IsOptional()
    description: string;

      @Column({ type: 'timestamp' })
  startAt: Date;

  @Column({ type: 'timestamp' })
  endAt: Date;


    @OneToOne(
      () => CampaignNotification,
      (notification) => notification.loyaltyProgram,
      { cascade: true, eager: true }
    )
    notification: CampaignNotification;

    @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

   @Column({nullable: true})
  validDays: recurringValidDays;

    @Column({nullable: true})
  validityStartTime: string;

  @Column({nullable: true})
  validityEndTime: string;
    
   @Column({ type: 'jsonb', nullable: true })
  rules: Record<string, any>;

}