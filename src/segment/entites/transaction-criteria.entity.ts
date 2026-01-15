import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { conditions } from "../enums/comparison.enum";
import { ComparisonOperator } from "../enums/segment-opretaors.enum";
import { UserSegment } from "./user_segment.entity";

@Entity('transaction_criteria')

export class TransactionCriteria {
     @PrimaryGeneratedColumn()
        id: number;

            @OneToOne(() => UserSegment, (userSegment) => userSegment.membersCriteria, {
    onDelete: 'CASCADE',
  })
    userSegment: UserSegment;

    rules: string;

    @Column({nullable: true})
    comparisionOpreator: ComparisonOperator;

    @Column() 
    conditions: conditions;

    @Column({nullable: true})
    value: number;


    @Column({nullable: true})
    startDate: Date;

    @Column({nullable: true})
    endDate: Date;

    
}