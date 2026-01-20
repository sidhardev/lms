import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { LoyaltyProgram } from './loyalty-program.entity';

@Entity()
export class DailyLoginStreak {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  days: number;

  @Column()
  pointsEarned: number;

  @OneToOne(() => LoyaltyProgram, (program) => program.dailyLoginStreak, { onDelete: 'CASCADE' })
  @JoinColumn()
  loyaltyProgram: LoyaltyProgram;
}