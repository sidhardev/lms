import { IsOptional, MaxLength, MinLength } from 'class-validator';
import { timestamp } from 'rxjs';
import { CouponRuleType } from 'src/coupons/admin/coupon-rule-type.enum';
import { CouponType } from 'src/coupons/admin/coupon-type.enum';
import { Coupon } from 'src/coupons/coupon.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

export enum CampaignType {
  LOYALTYPROGRAM = 'LOYALTY_PROGRAM',
  DISCOUNT_COUPON = "DISCOUNT_COUPON"
}

export enum DiscountType {
  REWARD = 'REWARD',
  FREE_SHIPPING = 'FREE_SHIPPING',
  ORDER_DISCOUNT = 'ORDER_DISCOUNT',
}



 

export enum CampaignStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  EXPIRED = 'EXPIRED',
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
  discountType: DiscountType

  @Column({
    type: 'enum',
    enum: CampaignStatus,
    default: CampaignStatus.DRAFT,
  })
  status: CampaignStatus;


   @OneToOne(() => Coupon, (coupon) => coupon.campaign, {
    cascade: true,
  })
  coupon: Coupon

  @Column({
    type: 'enum',
    enum: CampaignType,
  })
  type: CampaignType;

  @Column({
    type: 'boolean',
  nullable: true,})
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
  @Column({nullable: true})
  @MinLength(4)
  @MaxLength(6)
  code: string;

  @Column({nullable: true})
  couponType: CouponType;



   @OneToOne(() => campaign, (campaign) => campaign.coupon, {
    onDelete: 'CASCADE',
  })
  @JoinColumn() 
  campaign: campaign;



 

@Column({ type: 'jsonb', nullable: true })
rules: Record<string, any>;




  @Column({ default: true })
  isActive: boolean;
 
  @Column({ nullable: true })
  createdBy: number;
}
