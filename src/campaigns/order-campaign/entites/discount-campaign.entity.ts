import { IsOptional } from 'class-validator';
import { ShippingMethod } from 'src/campaigns/enums/shipping_method.enum';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { WholeCart } from './whole-cart.entity';
import { BulkPurchase } from './bulk-purchase.entity';
import { recurringCycle, recurringValidDays } from '../../enums/campaign.enums';
import { Campaigns } from '../../campaign.entity';
import { CartCustomTotal } from './cart-total-custom.entity';

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

    @OneToOne(() => CartCustomTotal, (cartTotal) => cartTotal.campaign, {
    cascade: true,
    eager: true,
  })
  cartTotalCustom: BulkPurchase;



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
