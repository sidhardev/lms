import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { SegmentType } from "../enums/segment-type.enum";
import { Segment } from "./basic-segment.enity";
import { AdvancedSegment } from "./advance-segment.entity";

@Entity('segment')

export class ParentSegment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column() 
    name: string;

    @Column() 
    descriptiton: string;

    @Column()
    segmentType: SegmentType;

    @OneToOne(()=> Segment, (segment)=> segment.ParentSegment, {
        cascade: true,
        onDelete: "CASCADE"
    })
    basicSegment: Segment;

     @OneToOne(()=> AdvancedSegment, (segment)=> segment.ParentSegment, {
        cascade: true,
        onDelete: 'CASCADE'
     })
    advanceSegment: AdvancedSegment;



}