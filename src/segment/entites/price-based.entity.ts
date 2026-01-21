import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductSegment } from './product_segment.entity';

@Entity('price_based')
export class PriceBased {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => ProductSegment,
    (ProductSegment) => ProductSegment.priceBased,
    {
      onDelete: 'CASCADE',
    },
  )
  ProductSegment: ProductSegment;
  @Column()
  minPrice: number;

  @Column()
  maxPrice: number;
}
