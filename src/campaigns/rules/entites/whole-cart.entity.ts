import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DiscountMode, RuleType } from '../rules.enum';

@Entity('whole_cart_discounts')
export class WholeCart {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: RuleType,
  })
  ruleType: RuleType.WHOLE_CART;

  @Column({
    type: 'enum',
    enum: DiscountMode,
  })
  discountMode: DiscountMode;

  @Column({
    type: 'int',
    nullable: true,
  })
  discoutPercent?: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  discountAmount?: number;

  @Column({
    type: 'int',
  })
  MaxDiscount: number;
}
