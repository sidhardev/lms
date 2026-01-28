import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserSegment } from './user_segment.entity';
import { ProductSegment } from './product_segment.entity';
import { BasicSegmentType } from '../enums/segementType.enum';
import { ParentSegment } from './segment.entity';

@Entity('basic-segment')
export class Segment {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => ParentSegment, (ParentSegment) => ParentSegment.basicSegment)
  @JoinColumn()
  ParentSegment: ParentSegment;

  @OneToOne(() => UserSegment, (userSegment) => userSegment.segment, {
    cascade: true,
    eager: true,
  })
  UserSegment: UserSegment;

  @OneToOne(() => ProductSegment, (productSegment) => productSegment.segment, {
    cascade: true,
    eager: true,
  })
  ProductSegment: ProductSegment;

  @Column()
  segmentType: BasicSegmentType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
