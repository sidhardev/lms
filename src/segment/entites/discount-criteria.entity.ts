import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserSegment } from "./user_segment.entity";
import { ComparisonOperator } from "../enums/segment-opretaors.enum";
import { conditions } from "../enums/comparison.enum";

@Entity('disocunt_criteria')

export class discountCriteria {
      @PrimaryGeneratedColumn()
        id: number;

    @OneToOne(() => UserSegment, (userSegment) => userSegment.membersCriteria, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
    userSegment: UserSegment;

    rules: string;

    @Column({nullable: true})
    comparisionOpreator: ComparisonOperator;

    @Column() 
    conditions: conditions;

    @Column({nullable: true})
    value: number;


    @Column({nullable: true})
    startValue: number;

    @Column({nullable: true})
    endValue: number;

    

}