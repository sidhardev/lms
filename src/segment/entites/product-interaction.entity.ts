import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductSegment } from "./product_segment.entity";

@Entity()

export class ProductInteraction  {
    @PrimaryGeneratedColumn()
    id: number;

     @OneToOne(() => ProductSegment, (ProductSegment) => ProductSegment.productInteraction, {
        onDelete: 'CASCADE',
      })
        @JoinColumn()
        ProductSegment: ProductSegment;

    @Column()
    pattern: string;

    @Column()
    days: number;



}