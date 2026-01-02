import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Coupon } from '../coupon.entity';

@Entity()
export class CouponRedemption {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Coupon)
  coupon: Coupon;

  @Column()
  userId: number;

  @Column()
  orderId: number;

  @Column('decimal')
  discountAmount: number;

  @CreateDateColumn()
  redeemedAt: Date;
}
