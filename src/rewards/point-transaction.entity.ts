import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { User } from 'src/user/user.entity';
export enum PointTransactionType {
  EARN = 'EARN',
  REDEEM = 'REDEEM',
  EXPIRE = 'EXPIRE',
  ADJUST = 'ADJUST',
}

export enum PointTransactionSource {
  ORDER = 'ORDER',
  COUPON = 'COUPON',
  GIFT = 'GIFT',
  ADMIN = 'ADMIN',
}
@Entity('point_transactions')
export class PointTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  userId: number;

  @Column({
    type: 'enum',
    enum: PointTransactionType,
  })
  type: PointTransactionType;

  @Column({
    type: 'enum',
    enum: PointTransactionSource,
  })
  source: PointTransactionSource;

  @Column({ nullable: true })
  referenceId?: number;
  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;
}
