import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductSegment } from './product_segment.entity';
import { stockLevelRule } from '../enums/stock-level.enum';

@Entity('stock_level')
export class StockLevel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => ProductSegment,
    (ProductSegment) => ProductSegment.stockLevel,
    {
      onDelete: 'CASCADE',
    },
  )
   ProductSegment: ProductSegment;

  @Column()
  rule: stockLevelRule;

  @Column()
  value: number;

  @Column()
  days: number;
}
