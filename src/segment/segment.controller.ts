import { Body, Controller, Get, Post } from '@nestjs/common';
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
  getAll() {
    return this.segmentService.getAll();
  }

}
