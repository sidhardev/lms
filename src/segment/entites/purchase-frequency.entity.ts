import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductSegment } from './product_segment.entity';
import { PurchaseFrequencyRule } from '../enums/purchase-frequency.enum';

@Entity('purchase_frequency')
export class PurchaseFrequency {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => ProductSegment,
    (ProductSegment) => ProductSegment.purchaseFrequency,
    {
      onDelete: 'CASCADE',
    },
  )
  ProductSegment: ProductSegment;

  @Column()
  rule: PurchaseFrequencyRule;

  @Column()
  minPurchaseCount: number;

  @Column()
  days: number;
}
