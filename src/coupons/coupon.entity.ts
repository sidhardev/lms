import { campaign } from 'src/campaigns/campaign.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { MaxLength, MinLength } from 'class-validator';
import { CouponType } from './admin/coupon-type.enum';
import { ApiExtraModels } from '@nestjs/swagger';
import { CouponRuleType } from './admin/coupon-rule-type.enum';

@Entity()
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @MinLength(4)
  @MaxLength(6)
  code: string;

  @Column({ nullable: true })
  couponType: CouponType;

  

  @Column({
    type: 'enum',
    enum: CouponRuleType,
    nullable: true,
  })
  ruleType: CouponRuleType;

  @Column({ type: 'jsonb', nullable: true })
  rules: Record<string, any>;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  startAt: Date;

  @Column()
  endAt: Date;

  @Column({ nullable: true })
  createdBy: number;
}
