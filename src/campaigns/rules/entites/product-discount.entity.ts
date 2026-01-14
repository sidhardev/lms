import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RuleType } from '../rules.enum';

@Entity('product_discounts')
export class ProductDiscount {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: RuleType,
  })
  ruleType: RuleType.PRODUCT;

  @Column({
    type: 'boolean',
  })
  keepSameForAll: boolean;

  @Column({
    type: 'json',
  })
  segments: Record<string, any>;
}
