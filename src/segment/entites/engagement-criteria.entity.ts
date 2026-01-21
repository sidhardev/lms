import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserSegment } from './user_segment.entity';
import { ComparisonOperator } from '../enums/segment-opretaors.enum';
import { conditions } from '../enums/comparison.enum';
import { EngagementRuleType } from '../enums/engagement-rule.enum';

@Entity('engagement_criteria')
export class EngagementCriteria {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserSegment, (userSegment) => userSegment.membersCriteria, {
    onDelete: 'CASCADE',
  })
  userSegment: UserSegment;
  @Column()
  rule: EngagementRuleType;

  @Column({ nullable: true })
  comparisionOpreator: ComparisonOperator;

  @Column()
  conditions: conditions;

  @Column()
  value: number;
}
