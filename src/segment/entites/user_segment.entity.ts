import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Segment } from './segment.enity';
import { MembersCriteria } from './members-criteria.entity';
import { discountCriteria } from './discount-criteria.entity';
import { EngagementCriteria } from './engagement-criteria.entity';
import { TransactionCriteria } from './transaction-criteria.entity';

@Entity('user_segment')
export class UserSegment {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Segment, (segment) => segment.UserSegment, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  segment: Segment;

  @OneToMany(() => MembersCriteria, (c) => c.userSegment)
  membersCriteria: MembersCriteria[];

  @OneToMany(() => discountCriteria, (c) => c.userSegment)
  discountCriteria: discountCriteria[];

  @OneToMany(() => EngagementCriteria, (c) => c.userSegment)
  engagementCriteria: EngagementCriteria[];

  @OneToMany(() => TransactionCriteria, (c) => c.userSegment)
  transactionCriteria: TransactionCriteria[];
}
