import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, JoinColumn, Index} from 'typeorm';
import { User } from 'src/user/user.entity';
@Entity('wallets')
export class Wallet {


  @PrimaryGeneratedColumn()
  id: number

  @Index({ unique: true })
  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({name: 'userId'})
  user: User

  @Column()
  userId: number

  @Column({type: 'int', default: 0})
  totalPoints: number;

  @Column({type: 'int', default: 0})
    availablePoints: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;


  

}