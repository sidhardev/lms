import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('purchase_frequency')

export class PurchaseFrequency {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Column()
    minPurchaseCount: number;


    @Column()
    days: number;

}