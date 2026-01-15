import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Segment } from "./segment.enity";
import { ProductInteraction } from "./product-interaction.entity";
import { StockLevel } from "./stock-level.entity";
import { PriceBased } from "./price-based.entity";
import { PurchaseFrequency } from "./purchase-frequency.entity";

@Entity()

export class ProductSegment { 

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Segment, (segment) => segment.UserSegment, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  segment: Segment;



  @OneToOne(() => ProductInteraction, (c) => c.ProductSegment)
  productInteraction: ProductInteraction;

  @OneToOne(() => StockLevel, (c) => c.ProductSegment)
  stockLevel: StockLevel;

  @OneToOne(() => PriceBased, (c) => c.ProductSegment)
  priceBased: PriceBased;

  @OneToOne(() => PurchaseFrequency, (c) => c.ProductSegment)
  purchaseFrequency: PurchaseFrequency;









}