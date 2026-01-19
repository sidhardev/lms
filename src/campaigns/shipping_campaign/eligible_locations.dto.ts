import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class EligibleLocationDto {
  @ApiProperty({
    example: 'India',
    description: 'Country name where free shipping is applicable',
  })
  @IsString()
  country_name: string;

  @ApiProperty({
    example: ['Rajasthan', 'Punjab'],
    description: 'List of eligible states under the country',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  states: string[];

  @ApiProperty({
    example: ['Jaipur', 'Edinburgh'],
    description: 'List of eligible cities under the country',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  cities: string[];
}
