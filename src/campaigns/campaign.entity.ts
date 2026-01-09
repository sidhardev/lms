import { IsOptional, MaxLength, MinLength } from 'class-validator';
import { timestamp } from 'rxjs';
import { CouponRuleType } from 'src/coupons/admin/coupon-rule-type.enum';
import { CouponType } from 'src/coupons/admin/coupon-type.enum';
import { Coupon } from 'src/coupons/coupon.entity';
import { EligibleLocationDto } from 'src/shipping_campaign/eligible_locations.dto';
import { ShippingMethod } from 'src/shipping_campaign/shipping_method.enum';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Timestamp } from 'typeorm/browser';

export enum DiscountType {
  FREE_SHIPPING = 'FREE_SHIPPING',
  ORDER_DISCOUNT = 'ORDER_DISCOUNT',
}

export enum redemptionType {
  INSTANTLY = 'INSTANTLY',
  NEXT_ORDER = 'NEXT_ORDER'
}

export enum userEligiblity {
  NEW_USER = 'NEW_USER',
  OLD_USER = 'OLD_USER',
  LIMIT_USER = 'LIMIT_USER',
  SEGMENT_USER = 'SEGMENT_USER'
}

export enum CampaignStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  EXPIRED = 'EXPIRED',
}
export enum ruccringCycle {
  EVERY_MONTH = 'EVERY_MONTH',
  EVERY_WEEK = 'EVERY_WEEK'
}

export enum ruccringValidDays {
  SUN = "SUN",
  MON = "MON",
  TUE = "TUE",
  WED = "WED",
  THR = "THR",
  FRI = "FRI",
  SAT = "SAT"
}

@Entity('campaigns')
export class campaign {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  @IsOptional()
  description: string;

  @Column({
    type: 'enum',
    enum: DiscountType,
  })
  discountType: DiscountType;

  @Column({
    type: 'enum',
    enum: CampaignStatus,
    default: CampaignStatus.DRAFT,
  })
  status: CampaignStatus;

  @OneToOne(() => Coupon, (coupon) => coupon.campaign, {
    cascade: true,
  })
  coupon: Coupon;

  @Column({
    type: 'boolean',
    nullable: true,
    default: false,
  })
  @IsOptional()
  useItAsCoupon: boolean;

  @Column({ type: 'timestamp' })
  startAt: Date;

  @Column({ type: 'timestamp' })
  endAt: Date;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  @Column({ nullable: true })
  @MinLength(4)
  @MaxLength(6)
  code: string;

  @Column({ nullable: true })
  couponType: CouponType;

  @OneToOne(() => campaign, (campaign) => campaign.coupon, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  campaign: campaign;


  @Column({nullable: true})
  maxUses: number;

  @Column({nullable: true})
  unlimitedUses: boolean;

  @Column({nullable: true})
  redemptionType: redemptionType;

  @Column({nullable: true})
  userEligiblity: userEligiblity; 

  @Column({nullable: true})
  ruccringValidity: boolean;

  @Column({nullable: true})
  ruccringCycle: ruccringCycle;

  @Column({nullable: true})
  ruccringValidDays: ruccringValidDays;

  @Column({nullable: true})
  ruccringStartTime: Timestamp;

  @Column({nullable: true})
  ruccringEndTime: Timestamp;

  @Column({ type: 'jsonb', nullable: true })
  rules: Record<string, any>;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  createdBy: number;

  @Column({ default: ShippingMethod.NONE })
  shippingMethod: ShippingMethod;

  @Column({ default: 0 })
  minOrderValue: number;
  @Column({ default: 0 })
  maxDiscount: number;

  @Column({ default: { contries: 'no one' }, type: 'jsonb' })
  eligible_locations: EligibleLocationDto[];
}
