import { IsObject, IsOptional } from "class-validator";
import { ruccringValidDays } from "src/campaigns/campaign.entity";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('loyalty-program')
export class LoyaltyProgram {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;


    @Column()
    @IsOptional()
    description: string;

      @Column({ type: 'timestamp' })
  startAt: Date;

  @Column({ type: 'timestamp' })
  endAt: Date;

    @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

   @Column({nullable: true})
  validDays: ruccringValidDays;

    @Column({nullable: true})
  validityStartTime: string;

  @Column({nullable: true})
  validityEndTime: string;
    
   @Column({ type: 'jsonb', nullable: true })
  rules: Record<string, any>;

}