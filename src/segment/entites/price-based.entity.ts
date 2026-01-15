import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('price_based')

export class PriceBased {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    minPrice: number;

    @Column()
    maxPrice: number;



}