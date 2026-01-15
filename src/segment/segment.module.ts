import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Segment } from './entites/segment.enity';
import { SegmentService } from './segment.service';
import { SegmentController } from './segment.controller';
import { discountCriteria } from './entites/discount-criteria.entity';
import { EngagementCriteria } from './entites/engagement-criteria.entity';
import { MembersCriteria } from './entites/members-criteria.entity';
import { ProductSegment } from './entites/product_segment.entity';
import { TransactionCriteria } from './entites/transaction-criteria.entity';
import { UserSegment } from './entites/user_segment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Segment, discountCriteria, EngagementCriteria, MembersCriteria, ProductSegment, TransactionCriteria, UserSegment ])],
  controllers: [SegmentController],
  providers: [SegmentService],
})
export class SegmentModule {}
