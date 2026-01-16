import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { LoyaltyProgram } from './loyalty-program.entity';

@Entity()
export class PointsPerRupee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderSpend: number;

  @Column()
  pointsEarned: number;

  @Column({ default: false })
  applyAfterDiscount: boolean;

  @OneToOne(() => LoyaltyProgram, (program) => program.pointsPerRupee, { onDelete: 'CASCADE' })
  @JoinColumn()
  loyaltyProgram: LoyaltyProgram;
}