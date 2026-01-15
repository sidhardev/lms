import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('stock_level')

export class StockLevel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    level: string;

    @Column()
    value: number;

    @Column()
    days: number;


}