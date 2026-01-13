
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, ValidateNested } from 'class-validator';
import { AccumulationRuleType } from '../enums/points.enum';
import { CategoryPointsItemDto } from './category-points-item.dto';

export class CategoryBasedDto {
  @ApiProperty({
    enum: AccumulationRuleType,
    example: AccumulationRuleType.CATEGORY_BASED,
  })
  @IsEnum(AccumulationRuleType)
  ruleType: AccumulationRuleType.CATEGORY_BASED;

  @ApiProperty({ type: () => [CategoryPointsItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoryPointsItemDto)
  categories: CategoryPointsItemDto[];
}
