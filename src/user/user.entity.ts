import { Entity } from "typeorm";
import { PrimaryGeneratedColumn, Column,  } from "typeorm";
import { Exclude } from "class-transformer";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;
  
  @Column()
  lastname: string;
  
  @Column({ unique: true })
  email: string;
  
  @Column()
  @Exclude()
  password: string;
}