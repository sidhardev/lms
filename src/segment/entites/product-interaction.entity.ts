import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductSegment } from "./product_segment.entity";
import { ProductInteractionRule } from "../enums/product-interaction.enum";

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
    rule: ProductInteractionRule;

    @Column()
    days: number;



}