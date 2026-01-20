import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Segment } from './segment.enity';
import { ProductInteraction } from './product-interaction.entity';
import { StockLevel } from './stock-level.entity';
import { PriceBased } from './price-based.entity';
import { PurchaseFrequency } from './purchase-frequency.entity';

@Entity()
export class ProductSegment {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Segment, (segment) => segment.ProductSegment, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  segment: Segment;

  @OneToMany(() => ProductInteraction, (c) => c.ProductSegment)
  productInteraction: ProductInteraction;

  @OneToMany(() => StockLevel, (c) => c.ProductSegment)
  stockLevel: StockLevel;

  @OneToMany(() => PriceBased, (c) => c.ProductSegment)
  priceBased: PriceBased;

  @OneToMany(() => PurchaseFrequency, (c) => c.ProductSegment)
  purchaseFrequency: PurchaseFrequency;
}
