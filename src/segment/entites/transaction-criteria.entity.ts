import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { conditions } from '../enums/comparison.enum';
import { ComparisonOperator } from '../enums/segment-opretaors.enum';
import { UserSegment } from './user_segment.entity';
import { TransactionRules } from '../enums/transaction-rule.enum';

@Entity('transaction_criteria')
export class TransactionCriteria {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserSegment, (userSegment) => userSegment.membersCriteria, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  userSegment: UserSegment;

  @Column()
  rules: TransactionRules;

  @Column({ nullable: true })
  comparisionOpreator: ComparisonOperator;

  @Column()
  conditions: conditions;

  @Column({ nullable: true })
  value: number;

  @Column({ nullable: true })
  startDate: Date;

  @Column({ nullable: true })
  endDate: Date;
}
