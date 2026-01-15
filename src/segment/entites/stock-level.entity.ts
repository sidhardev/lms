import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductSegment } from './product_segment.entity';
import { stockLevelRule } from '../enums/stock-level.enum';

@Entity('stock_level')
export class StockLevel {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(
    () => ProductSegment,
    (ProductSegment) => ProductSegment.stockLevel,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn()
  ProductSegment: ProductSegment;

  @Column()
  rule: stockLevelRule;

  @Column()
  value: number;

  @Column()
  days: number;
}
