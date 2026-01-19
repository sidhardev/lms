import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { CreateSegmentDto } from './dtos/create-segment.dto';
import { SegmentService } from './segment.service';

@Controller('segment')
export class SegmentController {
  constructor(private readonly segmentService: SegmentService) {}

  @Post('/create')
  create(@Body() createSegmentDto: CreateSegmentDto) {
    return this.segmentService.create(createSegmentDto);
  }
  @Get('/all')
  getAll(@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,) {
    return this.segmentService.getAll(page, limit);
  }

@Get('/:id')
findById(@Param('id') id: number) {
  return this.segmentService.findById(id);
}


  @Delete(':id')
  deleteById(@Param('id') id: number) {
     this.segmentService.deleteById(id);
     return {
      status: true,
      message: 'Segment deleted successfully'
     }
  } 

}
