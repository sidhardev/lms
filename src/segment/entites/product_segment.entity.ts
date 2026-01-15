import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Segment } from "./segment.enity";

@Entity()

export class ProductSegment { 

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Segment, (segment) => segment.UserSegment, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  segment: Segment;







}