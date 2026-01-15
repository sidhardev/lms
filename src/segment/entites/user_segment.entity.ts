import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Segment } from "./segment.enity";
import { MembersCriteria } from "./members-criteria.entity";
import { discountCriteria } from "./discount-criteria.entity";
import { EngagementCriteria } from "./engagement-criteria.entity";
import { TransactionCriteria } from "./transaction-criteria.entity";

@Entity('user_segment')

export class UserSegment {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Segment, (segment) => segment.UserSegment, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  segment: Segment;

  @OneToOne(() => MembersCriteria, (c) => c.userSegment)
  membersCriteria: MembersCriteria[];

  @OneToOne(() => discountCriteria, (c) => c.userSegment)
  discountCriteria: discountCriteria[];

  @OneToOne(() => EngagementCriteria, (c) => c.userSegment)
  engagementCriteria: EngagementCriteria[];

  @OneToOne(() => TransactionCriteria, (c) => c.userSegment)
  transactionCriteria: TransactionCriteria[];




}