import { campaign } from 'src/campaigns/campaign.entity';
import { PrimaryGeneratedColumn, Column, Entity, OneToOne, JoinColumn } from 'typeorm';
import { MaxLength, MinLength } from 'class-validator';
import { CouponType } from './admin/coupon-type.enum';
export enum CouponRuleType {
  WHOLE_CART = 'WHOLE_CART',
CART_TOTAL = "CART_TOTAL",
BULK = "BULK",
CATEGORY = "CATEGORY",
PRODUCT = "PRODUCT",
BRAND = "BRAND",


}
@Entity()
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
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



 @Column({
  type: 'enum',
  enum: CouponRuleType,
  nullable: true
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
