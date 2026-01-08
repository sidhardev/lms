import { campaign } from 'src/campaigns/campaign.entity';
import { PrimaryGeneratedColumn, Column, Entity, OneToOne, JoinColumn } from 'typeorm';
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

  @Column()
  code: string;



   @OneToOne(() => campaign, (campaign) => campaign.coupon, {
    onDelete: 'CASCADE',
  })
  @JoinColumn() // 👈 owning side (important)
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
