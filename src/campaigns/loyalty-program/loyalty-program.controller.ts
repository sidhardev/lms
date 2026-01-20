import { Body, Controller, Delete, Get, Param, Post, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { CreateLoyaltyProgramDto } from './dtos/create-loyalty-program.dto';
import { LoyaltyProgramService } from './loyalty-program.service';
import { ApiCreatedResponse, ApiQuery } from '@nestjs/swagger';
import { LoyaltyProgram } from './entities/loyalty-program.entity';

@Controller()
export class LoyaltyProgramController {
   
}
