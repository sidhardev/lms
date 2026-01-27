import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { CreateLoyaltyProgramDto } from './dtos/create-loyalty-program.dto';
import { LoyaltyProgramService } from './loyalty-program.service';
import { ApiCreatedResponse, ApiQuery } from '@nestjs/swagger';
import { LoyaltyProgram } from './entities/loyalty-program.entity';

@Controller('campaigns/loyalty-program')
export class LoyaltyProgramController {
  constructor(private readonly loyaltyProgramService: LoyaltyProgramService) {}

  // @Post('create')
  @ApiCreatedResponse({
    description: 'Loyalty program created successfully',
    type: LoyaltyProgram,
  })
  create(
    @Body() createLoyaltyProgramDto: CreateLoyaltyProgramDto,
  ): Promise<LoyaltyProgram> {
    return this.loyaltyProgramService.create(createLoyaltyProgramDto);
  }

  // @Get()
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.loyaltyProgramService.findAll(page, limit);
  }

  // @Delete(':id')
  deleteById(@Param('id', ParseIntPipe) id: number) {
    return this.loyaltyProgramService.deleteById(id);
  }
}
