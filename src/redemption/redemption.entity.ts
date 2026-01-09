import { IsOptional } from 'class-validator';
import { timestamp } from 'rxjs';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('redemption')
export class Redemption {
  @Column({
    nullable: true,
  })
  @IsOptional()
  maxUses: number;

  @Column({
    nullable: true,
  })
  @IsOptional()
  unlimitedUses: boolean;

  @Column({
    nullable: true,
  })
  @IsOptional()
  redemptionType: string;

  @Column({
    nullable: true,
  })
  @IsOptional()
  userEligblity: string;

  @Column({
    nullable: true,
  })
  @IsOptional()
  userLimit: number;

  @Column({
    nullable: true,
  })
  @IsOptional()
  validDaysOfWeek: string;

  @Column({
    nullable: true,
  })
  @IsOptional()
  recurringValidity: boolean;

  @Column({
    nullable: true,
  })
  @IsOptional()
  recurringValidityType: string;
}
