import {
  Column,
  Entity,
   ManyToOne,
   PrimaryGeneratedColumn,
} from 'typeorm';
import { UserSegment } from './user_segment.entity';
import { ComparisonOperator } from '../enums/segment-opretaors.enum';
import { conditions } from '../enums/comparison.enum';
 import { DiscountRule } from '../enums/discount-criteria.enum';

@Entity('disocunt_criteria')
export class discountCriteria {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserSegment, (userSegment) => userSegment.membersCriteria, {
    onDelete: 'CASCADE',
  })
  userSegment: UserSegment;

  @Column()
  rules: DiscountRule;

  @Column({ nullable: true })
  comparisionOpreator: ComparisonOperator;

  @Column()
  conditions: conditions;

  @Column({ nullable: true })
  value: number;

  @Column({ nullable: true })
  startValue: number;

  @Column({ nullable: true })
  endValue: number;
}
