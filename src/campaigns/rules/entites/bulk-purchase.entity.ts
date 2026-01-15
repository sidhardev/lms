import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DiscountMode, RuleType } from '../rules.enum';

@Entity('bulk_purchases')
export class BulkPurchase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: RuleType,
  })
  ruleType: RuleType.BULK_PURCHASE;

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
  })
  minItems: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  discountAmount?: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  discountPercent?: number;
}
