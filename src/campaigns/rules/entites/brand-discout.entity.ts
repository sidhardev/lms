import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DiscountMode, RuleType } from '../rules.enum';

@Entity('brand_discounts')
export class BrandDiscount {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: RuleType,
  })
  ruleType: RuleType.BRAND;

  @Column({
    type: 'boolean',
  })
  keepSameForAll: boolean;

  @Column({
    type: 'enum',
    enum: DiscountMode,
  })
  discountMode: DiscountMode;

  @Column({
    type: 'jsonb',
  })
  brands: Record<string, any>;
}
