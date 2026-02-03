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
import { ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('segment')
export class SegmentController {
  constructor(private readonly segmentService: SegmentService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Create Segments' })
  create(@Body() createSegmentDto: CreateSegmentDto) {
    return this.segmentService.create(createSegmentDto);
  }

  @Get('/get')
  @ApiOperation({ summary: 'Get all segments' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.segmentService.getAll(page, limit);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get segments by ID' })
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.segmentService.findById(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete segments by ID' })
  async deleteById(@Param('id') id: number) {
    await this.segmentService.deleteById(id);
    return {
      status: true,
      message: 'Segment deleted successfully',
    };
  }
}
