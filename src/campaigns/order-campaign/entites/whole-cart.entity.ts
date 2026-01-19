// c:\Users\Moon Link\lms\src\campaigns\rules\entities\whole-cart.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { campaign } from '../discount-campaign.entity';
import { RuleType, DiscountMode } from '../rules/rules.enum';

@Entity('whole_cart_discounts')
export class WholeCart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: RuleType,
    default: RuleType.WHOLE_CART,
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

  @Column({ type: 'int', nullable: true })
  maxDiscount: number;

  @OneToOne(() => campaign, (campaign) => campaign.wholeCart, { onDelete: 'CASCADE' })
  @JoinColumn()
  campaign: campaign;
}
