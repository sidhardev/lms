import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Segment } from './segment.enity';
import { Repository } from 'typeorm';
import { CreateSegmentDto } from './dtos/create-segment.dto';

@Injectable()
export class SegmentService {

    constructor(@InjectRepository(Segment) private segmentRepository: Repository<Segment>) {}

    create(@Body() createSegmentDto: CreateSegmentDto) {

        const segment = this.segmentRepository.create(createSegmentDto);
        return this.segmentRepository.save(segment);
        


}

}
