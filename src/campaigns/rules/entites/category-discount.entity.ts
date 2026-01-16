// c:\Users\Moon Link\lms\src\campaigns\rules\entities\category-discount.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { campaign } from '../../campaign.entity';
import { RuleType, DiscountMode } from '../rules.enum';

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

  @OneToOne(() => campaign, (campaign) => campaign.categoryDiscount)
  campaign: campaign;
}
