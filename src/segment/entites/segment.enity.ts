import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { segmentType } from '../enums/segementType.enum';
import { CreateSegmentDto } from '../dtos/create-segment.dto';

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

  // @Column({type: 'jsonb', nullable: true})
  // criteria: ;
}
