import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { inclusion_status } from '../enums/inclusion_status.enum';
import { ParentSegment } from './segment.entity';

@Entity('advanced_segment')
export class AdvancedSegment {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(
    () => ParentSegment,
    (ParentSegment) => ParentSegment.advanceSegment,
  )
  @JoinColumn()
  ParentSegment: ParentSegment;

  @Column()
  inclusion_status: inclusion_status;

  @Column({
    type: 'simple-array',
  })
  selectedSegment: number[];
}
