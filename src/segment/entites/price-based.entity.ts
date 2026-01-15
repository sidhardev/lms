import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductSegment } from './product_segment.entity';

@Entity('price_based')
export class PriceBased {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(
    () => ProductSegment,
    (ProductSegment) => ProductSegment.priceBased,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn()
  ProductSegment: ProductSegment;
  @Column()
  minPrice: number;

  @Column()
  maxPrice: number;
}
