import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RuleType } from '../rules.enum';

@Entity('category_discounts')
export class CategoryDiscount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: RuleType,
  })
  ruleType: RuleType.CATEGORY;

  @Column({
    type: 'boolean',
  })
  keepSameForAll: boolean;

  @Column({
    type: 'json',
  })
  categories: Record<string, any>;
}
