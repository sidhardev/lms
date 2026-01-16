import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductSegment } from './product_segment.entity';
import { ProductInteractionRule } from '../enums/product-interaction.enum';

@Entity()
export class ProductInteraction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => ProductSegment,
    (ProductSegment) => ProductSegment.productInteraction,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn()
  ProductSegment: ProductSegment;

  @Column()
  rule: ProductInteractionRule;

  @Column()
  days: number;
}
