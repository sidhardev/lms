import { Body, Controller, Post } from '@nestjs/common';
import { CreateSegmentDto } from './dtos/create-segment.dto';
import { SegmentService } from './segment.service';

@Controller('segment')
export class SegmentController {

    constructor(private readonly segmentService: SegmentService) {}

    @Post()
    create(@Body() createSegmentDto: CreateSegmentDto) {
        return this.segmentService.create(createSegmentDto);
    }


}
