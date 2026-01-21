import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { LoyaltyProgram } from './loyalty-program.entity';

@Entity()
export class CategoryBased {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoryName: string;

  @Column()
  pointsEarned: number;

  @ManyToOne(() => LoyaltyProgram, (program) => program.categoryBased, {
    onDelete: 'CASCADE',
  })
  loyaltyProgram: LoyaltyProgram;
}
