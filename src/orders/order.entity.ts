import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, JoinColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne} from "typeorm";
import { User } from "src/user/user.entity";
export enum OrderStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
}
@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @Column() 
    amount: number

    @ManyToOne(() => User, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'userId'})
    user: User;

    @Column(
        {
            type: 'enum',
            enum: OrderStatus,
            default: OrderStatus.PENDING
        }
    )
    status: OrderStatus;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date

}