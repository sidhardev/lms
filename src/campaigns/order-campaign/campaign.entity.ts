import { IsOptional, MaxLength, MinLength } from 'class-validator';
import { timestamp } from 'rxjs';
import { CouponRuleType } from 'src/coupons/admin/coupon-rule-type.enum';
import { CouponType } from 'src/coupons/admin/coupon-type.enum';
import { Coupon } from 'src/coupons/coupon.entity';
import { CampaignNotification } from 'src/notifications/notification.entity';
import { EligibleLocationDto } from 'src/campaigns/shipping_campaign/eligible_locations.dto';
import { ShippingMethod } from 'src/campaigns/shipping_campaign/shipping_method.enum';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { WholeCart } from './entites/whole-cart.entity';
import { BulkPurchase } from './entites/bulk-purchase.entity';
import { CategoryDiscount } from './entites/category-discount.entity';
import { recurringCycle, recurringValidDays } from './campaign.enums';


export enum DiscountType {
  FREE_SHIPPING = 'FREE_SHIPPING',
  ORDER_DISCOUNT = 'ORDER_DISCOUNT',
}

export enum redemptionType {
  INSTANTLY = 'INSTANTLY',
  NEXT_ORDER = 'NEXT_ORDER',
}

export enum userEligiblity {
  NEW_USER = 'NEW_USER',
  OLD_USER = 'OLD_USER',
  LIMIT_USER = 'LIMIT_USER',
  SEGMENT_USER = 'SEGMENT_USER',
}

export enum CampaignStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  EXPIRED = 'EXPIRED',
}

export { recurringCycle, recurringValidDays };

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

  // @OneToOne(() => Coupon, (coupon) => coupon.campaign, {
  //   cascade: true,
  // })
  // coupon: Coupon;

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

  @OneToMany(
    () => CampaignNotification,
    (notification) => notification.campaign,
    { cascade: true, eager: true },
  )
  notifications: CampaignNotification[];




  @Column({ nullable: true })
  couponType: CouponType;

  @Column({ nullable: true })
  maxUses: number;

  @Column({ nullable: true })
  unlimitedUses: boolean;

  @Column({ nullable: true })
  redemptionType: redemptionType;

  @Column({ nullable: true })
  userEligiblity: userEligiblity;

  @Column({ nullable: true })
  recurringValidity: boolean;

  @Column({ nullable: true })
  recurringCycle: recurringCycle;

  @Column({
    type: 'enum',
    enum: recurringValidDays,
    array: true,
    nullable: true,
  })
  recurringValidDays?: recurringValidDays[];

  @Column({ nullable: true })
  recurringStartTime: string;

  @Column({ nullable: true })
  recurringEndTime: string;

  @Column({ type: 'jsonb', nullable: true })
  rules: Record<string, any>;

  @OneToOne(() => WholeCart, (wholeCart) => wholeCart.campaign, {
    cascade: true,
    eager: true,
  })
  wholeCart: WholeCart;

  @OneToOne(() => BulkPurchase, (bulkPurchase) => bulkPurchase.campaign, {
    cascade: true,
    eager: true,
  })
  bulkPurchase: BulkPurchase;

  @OneToOne(() => CategoryDiscount, (categoryDiscount) => categoryDiscount.campaign, {
    cascade: true,
    eager: true,
  })
  categoryDiscount: CategoryDiscount;

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

  @Column({ default: { countries: '' }, type: 'jsonb' })
  eligible_locations: EligibleLocationDto[];
}
