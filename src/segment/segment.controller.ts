import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateSegmentDto } from './dtos/create-basic-segment.dto';
import { SegmentService } from './segment.service';
import { ApiQuery } from '@nestjs/swagger';
import { CreateParentSegmentDto } from './dtos/create-parent-segment.dto';

@Controller('segment')
export class SegmentController {
  constructor(private readonly segmentService: SegmentService) {}

  @Post('/create')
  create(@Body() createSegmentDto: CreateSegmentDto) {
    return this.segmentService.create(createSegmentDto);
  }

  @Post('/create-parent')
  createParent(@Body() createParentSegmentDto: CreateParentSegmentDto) {
    return this.segmentService.createParentSegment(createParentSegmentDto);
  }

  @Get('/get')
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.segmentService.getAll(page, limit);
  }

  @Get('/:id')
  findById(@Param('id') id: number) {
    return this.segmentService.findById(id);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: number) {
    await this.segmentService.deleteById(id);
    return {
      status: true,
      message: 'Segment deleted successfully',
    };
  }
}
