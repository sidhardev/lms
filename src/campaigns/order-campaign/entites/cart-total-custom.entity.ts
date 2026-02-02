import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DiscountMode, RuleType } from '../rules/rules.enum';
import { campaign } from './discount-campaign.entity';

@Entity('cart_custom_total')
export class CartCustomTotal {
  @PrimaryGeneratedColumn()
  id: number;



  @Column({
    type: 'enum',
    enum: DiscountMode,
  })
  mode: DiscountMode;

  @Column({
    type: 'int',
  })
  minOrderValue: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  MinPercent?: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  MaxPercent?: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  MaxDiscount?: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  minAmount?: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  maxAmount?: number;

    @OneToOne(() => campaign, (campaign) => campaign.cartTotalCustom, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  campaign: campaign;
}
