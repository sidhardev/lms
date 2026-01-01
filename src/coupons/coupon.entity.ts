import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";
@Entity()
export class Coupon {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;
    
    @Column()
    type: 'ORDER';

    @Column()
    discountType: 'PERCENT' | 'FLAT';

    @Column('decimal')
    discountValue: number;

    @Column()
    minOrderValue: number;

    @Column('decimal', {nullable: true})
    maxDiscountValue: number;

    
  @Column({ default: false })
  isAutoApply: boolean;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  startAt: Date;

  @Column()
  endAt: Date;

}
