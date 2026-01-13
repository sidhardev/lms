import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { segmentType } from "./enums/segementType.enum";

@Entity()

export class Segment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    segmentType: segmentType;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({type: 'jsonb', nullable: true})
    criteria: Record<string, any>;


    

    
}