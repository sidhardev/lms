import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserSegment } from "./user_segment.entity";
import { ComparisonOperator } from "../enums/segment-opretaors.enum";
import { conditions } from "../enums/comparison.enum";
import { membersCriteria } from "../enums/members.enum";

@Entity('members_criteria')

export class MembersCriteria {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => UserSegment, (userSegment) => userSegment.membersCriteria, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
    userSegment: UserSegment;

  @Column()
  rules: membersCriteria;

  @Column({nullable: true})
  comparisionOpreator: ComparisonOperator;

  @Column()
  conditions: conditions;

  @Column({nullable: true})
  startDate: Date;

  @Column({nullable: true})
  endDate: Date;

  

  

@Column({nullable: true})
value: string ;


  


}