import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { campaign } from './discount-campaign.entity';
import { RuleType, DiscountMode } from '../rules/rules.enum';

@Entity('category_discounts')
export class CategoryDiscount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: RuleType,
    default: RuleType.CATEGORY,
  })
  ruleType: RuleType;

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
  categoryId: number;

  @OneToOne(() => campaign, (campaign) => campaign.categoryDiscount, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  campaign: campaign;
}
