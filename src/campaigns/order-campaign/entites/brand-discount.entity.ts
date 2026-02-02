import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { campaign } from './discount-campaign.entity';

@Entity('brand-discount')
export class BrandDiscount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  @Column({
    nullable: true,
  })
  discountPercent: number;

  @Column({ nullable: true })
  discountAmount: number;

  @Column()
  minOrderValue: number;

  @Column()
  maxDiscount: number;

  @ManyToOne(() => campaign, (campaign) => campaign.brandDiscount)
  discountCampaign: campaign;
}
