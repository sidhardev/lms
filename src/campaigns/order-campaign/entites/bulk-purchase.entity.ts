import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { campaign } from './discount-campaign.entity';
import { RuleType, DiscountMode } from '../rules/rules.enum';

@Entity('bulk_purchase_discounts')
export class BulkPurchase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: DiscountMode,
  })
  discountMode: DiscountMode;

  @Column({ type: 'int', nullable: true })
  discountPercent: number;

  @Column({ type: 'int', nullable: true })
  discountAmount: number;

  @Column({ type: 'int' })
  minOrderValue: number;

  @Column()
  minItems: number;

  @OneToOne(() => campaign, (campaign) => campaign.bulkPurchase, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  campaign: campaign;
}
