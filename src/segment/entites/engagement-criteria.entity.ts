import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserSegment } from "./user_segment.entity";
import { ComparisonOperator } from "../enums/segment-opretaors.enum";
import { conditions } from "../enums/comparison.enum";

    @Entity('engagement_criteria')

    export class EngagementCriteria {
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

    @Column()
    value: number;

  
}