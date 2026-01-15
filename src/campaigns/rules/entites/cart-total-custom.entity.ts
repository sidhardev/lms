import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DiscountMode, RuleType } from '../rules.enum';

@Entity('cart_custom_totals')
export class CartCustomTotal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: RuleType,
  })
  ruleType: RuleType.CART_TOTAL_CUSTOM;

  @Column({
    type: 'enum',
    enum: DiscountMode,
  })
  mode: DiscountMode;

  @Column({
    type: 'int',
  })
  minOrderValue: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  MinPercent?: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  MaxPercent?: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  MaxDiscount?: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  minAmount?: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  maxAmount?: number;
}
