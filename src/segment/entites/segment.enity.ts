import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { segmentType } from '../enums/segementType.enum';
import { CreateSegmentDto } from '../dtos/create-segment.dto';
import { UserSegment } from './user_segment.entity';
import { ProductSegment } from './product_segment.entity';

@Entity()
export class Segment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

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
  segmentType: segmentType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
