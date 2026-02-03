import { Injectable } from '@nestjs/common';
import { CreateSegmentDto } from './dtos/create-basic-segment.dto';
import { Segment } from './entites/basic-segment.enity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSegment } from './entites/product_segment.entity';
import { PriceBased } from './entites/price-based.entity';
import { PurchaseFrequency } from './entites/purchase-frequency.entity';
import { StockLevel } from './entites/stock-level.entity';
import { ProductInteraction } from './entites/product-interaction.entity';

@Injectable()
export class ProductsService {
    constructor( @InjectRepository(ProductSegment)
    private readonly productSegmentRepository: Repository<ProductSegment>,
 @InjectRepository(ProductInteraction)
    private readonly productInteractionRepository: Repository<ProductInteraction>,

    @InjectRepository(StockLevel)
    private readonly stockLevelRepository: Repository<StockLevel>,

    @InjectRepository(PurchaseFrequency)
    private readonly purchaseFrequencyRepository: Repository<PurchaseFrequency>,

    @InjectRepository(PriceBased)
    private readonly priceBasedRepository: Repository<PriceBased>,)  {}

       async createProductSegment(dto: CreateSegmentDto, segment: Segment) {
        const productSegment = await this.productSegmentRepository.save(
          this.productSegmentRepository.create({ segment }),
        );
    
        if (dto.productInteraction?.length) {
          await this.productInteractionRepository.save(
            dto.productInteraction.map((c) =>
              this.productInteractionRepository.create({
                ...c,
                ProductSegment: productSegment,
              }),
            ),
          );
        }
    
        if (dto.stockLevel?.length) {
          await this.stockLevelRepository.save(
            dto.stockLevel.map((c) =>
              this.stockLevelRepository.create({
                ...c,
                ProductSegment: productSegment,
              }),
            ),
          );
        }
    
        if (dto.purchaseFrequency?.length) {
          await this.purchaseFrequencyRepository.save(
            dto.purchaseFrequency.map((c) =>
              this.purchaseFrequencyRepository.create({
                ...c,
                ProductSegment: productSegment,
              }),
            ),
          );
        }
    
        if (dto.priceBased?.length) {
          await this.priceBasedRepository.save(
            dto.priceBased.map((c) =>
              this.priceBasedRepository.create({
                ...c,
                ProductSegment: productSegment,
              }),
            ),
          );
        }
      }
}
