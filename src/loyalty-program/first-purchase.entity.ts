import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { LoyaltyProgram } from './loyalty-program.entity';

@Entity()
export class FirstPurchase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pointsEarned: number;

  @OneToOne(() => LoyaltyProgram, (program) => program.firstPurchase, { onDelete: 'CASCADE' })
  @JoinColumn()
  loyaltyProgram: LoyaltyProgram;
}