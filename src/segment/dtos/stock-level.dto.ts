import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber,   } from 'class-validator';
import { stockLevelRule } from '../enums/stock-level.enum';

export class CreateStockLevelDto {
  @ApiProperty({ example: stockLevelRule.LOW_STOCK })
  @IsEnum(stockLevelRule)
  rule: stockLevelRule;

  @ApiProperty({ example: 10 })
  @IsNumber()
  value: number;

  @ApiProperty({ example: 5 })
  @IsNumber()
  days: number;
}
