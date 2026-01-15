import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class ProductInteraction  {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    pattern: string;

    @Column()
    days: number;



}