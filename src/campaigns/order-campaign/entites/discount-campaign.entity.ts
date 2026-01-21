import { IsEnum, IsOptional } from 'class-validator';
import { CouponType } from 'src/campaigns/enums/coupon-type.enum';
import { CampaignNotification } from 'src/notifications/entities/notification.entity';
import { ShippingMethod } from 'src/campaigns/enums/shipping_method.enum';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { WholeCart } from './whole-cart.entity';
import { BulkPurchase } from './bulk-purchase.entity';
import { CategoryDiscount } from './category-discount.entity';
import { recurringCycle, recurringValidDays } from '../../enums/campaign.enums';
import { campaignType } from '../../enums/campaign-type.enum';
import { Campaigns } from '../../campaign.entity';

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

@Entity('discount-campaigns')
export class campaign {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Campaigns, (campaigns) => campaigns.discountCoupons, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'campaignId' })
  campaign: Campaigns;

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

  @Column({
    type: 'boolean',
    nullable: true,
    default: false,
  })
  @IsOptional()
  useItAsCoupon: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(
    () => CampaignNotification,
    (notification) => notification.campaign,
    { cascade: true, eager: true },
  )
  notifications: CampaignNotification[];

  @Column({ nullable: true })
  maxUses: number;

  @Column({ nullable: true })
  unlimitedUses: boolean;

  @Column()
  redemptionType: redemptionType;

  @Column()
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

  @OneToOne(
    () => CategoryDiscount,
    (categoryDiscount) => categoryDiscount.campaign,
    {
      cascade: true,
      eager: true,
    },
  )
  categoryDiscount: CategoryDiscount;

  @Column({ default: ShippingMethod.NONE })
  shippingMethod: ShippingMethod;

  @Column({ default: 0 })
  minOrderValue: number;
  @Column({ default: 0 })
  maxDiscount: number;

  @Column({ type: 'jsonb', nullable: true })
  countries: string[];

  @Column({ type: 'jsonb', nullable: true })
  states: string[];

  @Column({ type: 'jsonb', nullable: true })
  cities: string[];
}
