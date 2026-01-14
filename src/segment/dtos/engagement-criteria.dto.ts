import { ApiProperty } from '@nestjs/swagger';
import { membersCriteria } from '../enums/members.enum';
import { EngagementRuleType } from '../enums/engagement-rule.enum';
import { UserCriteria } from '../enums/user-criteria.enum';
import { ComparisonOperator } from '../enums/comparison.enum';
import { Segmentopearotors } from '../enums/segment-opretaors.enum';

export class EngagmentCriteriaDto {
  @ApiProperty({
    example: UserCriteria.ENGAGEMENT_CRITERIA,
  })
  criteria: UserCriteria.ENGAGEMENT_CRITERIA;

  @ApiProperty({
    example: EngagementRuleType.ANY_COMMUNICATION,
  })
  engagementRule: EngagementRuleType;

  @ApiProperty({
    example: ComparisonOperator.IS,
  })
  comparison: ComparisonOperator;

  @ApiProperty({
    example: Segmentopearotors.GREATER_THEN,
  })
  operator: Segmentopearotors;

  @ApiProperty({
    example: 'Anything',
  })
  value: string;
}
