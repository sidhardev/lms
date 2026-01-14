import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Segment } from './segment.enity';
import { SegmentService } from './segment.service';
import { SegmentController } from './segment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Segment])],
  controllers: [SegmentController],
  providers: [SegmentService],
})
export class SegmentModule {}
