import { Body, Controller, Post } from '@nestjs/common';
import { CreateLoyaltyProgramDto } from './dtos/create-loyalty-program.dto';
import { LoyaltyProgramService } from './loyalty-program.service';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { LoyaltyProgram } from './loyalty-program.entity';

@Controller('loyalty-program')
export class LoyaltyProgramController {
constructor(private loyaltyProgramService: LoyaltyProgramService) {}
    @Post('/create')
     @ApiCreatedResponse({
    description: 'Loyalty program created successfully',
    type: LoyaltyProgram    ,
  })
    async create(
    @Body() createLoyaltyProgramDto: CreateLoyaltyProgramDto,
  ): Promise<LoyaltyProgram> {
    return this.loyaltyProgramService.create(createLoyaltyProgramDto);
    

}
}
