import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Segment } from './entites/basic-segment.enity';
import { SegmentService } from './segment.service';
import { SegmentController } from './segment.controller';
import { discountCriteria } from './entites/discount-criteria.entity';
import { EngagementCriteria } from './entites/engagement-criteria.entity';
import { MembersCriteria } from './entites/members-criteria.entity';
import { ProductSegment } from './entites/product_segment.entity';
import { TransactionCriteria } from './entites/transaction-criteria.entity';
import { UserSegment } from './entites/user_segment.entity';
import { PriceBased } from './entites/price-based.entity';
import { ProductInteraction } from './entites/product-interaction.entity';
import { PurchaseFrequency } from './entites/purchase-frequency.entity';
import { StockLevel } from './entites/stock-level.entity';
import { ParentSegment } from './entites/segment.entity';
import { AdvancedSegment } from './entites/advance-segment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Segment,
      discountCriteria,
      EngagementCriteria,
      MembersCriteria,
      ProductSegment,
      TransactionCriteria,
      UserSegment,
      PriceBased,
      ProductInteraction,
      PurchaseFrequency,
      StockLevel,
      ParentSegment,
      AdvancedSegment
    ]),
  ],
  controllers: [SegmentController],
  providers: [SegmentService],
})
export class SegmentModule {}
