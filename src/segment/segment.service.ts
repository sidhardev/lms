import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Segment } from './entites/basic-segment.enity';
import { CreateSegmentDto } from './dtos/create-basic-segment.dto';
import { AdvancedSegment } from './entites/advance-segment.entity';
import { BasicSegmentType } from './enums/segementType.enum';
import { ParentSegment } from './entites/segment.entity';
import { SegmentType } from './enums/segment-type.enum';
import { ProductsService } from './products.service';
import { UsersService } from './users.service';

@Injectable()
export class SegmentService {
  constructor(
    private readonly productService: ProductsService,
    private readonly usersService: UsersService,
    @InjectRepository(Segment)
    private readonly segmentRepository: Repository<Segment>,

    @InjectRepository(ParentSegment)
    private readonly parentSegmentRepo: Repository<ParentSegment>,

    @InjectRepository(AdvancedSegment)
    private readonly AdvancedSegmentRepo: Repository<AdvancedSegment>,
  
  ) {}

  async create(dto: CreateSegmentDto) {
    if (dto.segmentType !== SegmentType.BASIC_SEGMENT) {
      return this.CreateAdvancedSegment(dto);
    }
    this.validateSegmentType(dto);

    const parentSegment = this.parentSegmentRepo.create({
      name: dto.name,
      descriptiton: dto.description,
      segmentType: SegmentType.BASIC_SEGMENT,
    });

    const savedParentSegment = await this.parentSegmentRepo.save(parentSegment);

    const segment = this.segmentRepository.create({
      segmentType: dto.BasicSegmentType,
      ParentSegment: savedParentSegment,
    });

    const savedSegment = await this.segmentRepository.save(segment);

    if (dto.BasicSegmentType === BasicSegmentType.USER_SEGMENT) {
      await this.usersService.createUserSegment(dto, savedSegment);
    }

    if (dto.BasicSegmentType === BasicSegmentType.PRODUCT_SEGMENT) {
      await this.productService.createProductSegment(dto, savedSegment);
    }

    return {
      parentSegment: savedParentSegment,
    };
  }



  async CreateAdvancedSegment(dto: CreateSegmentDto) {
    const parentSegment = this.parentSegmentRepo.create({
      name: dto.name,
      descriptiton: dto.description,
      segmentType: SegmentType.ADVANCED_SEGMENT,
    });

    const savedParentSegment = await this.parentSegmentRepo.save(parentSegment);

    await this.AdvancedSegmentRepo.save(
      this.AdvancedSegmentRepo.create({
        inclusion_status: dto.inclusion_status,
        selectedSegment: dto.selectedSegment,
        ParentSegment: savedParentSegment,
      }),
    );

    return {
      savedParentSegment,
    };
  }

  async getAll(page: number, limit: number) {
    return await this.parentSegmentRepo.find({
      relations: ['basicSegment', 'advanceSegment'],
      order: {
        id: 'ASC',
      },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  private validateSegmentType(dto: CreateSegmentDto) {
    const hasUserCriteria =
      !!dto.membersCriteria?.length ||
      !!dto.engagementCriteria?.length ||
      !!dto.discountCriteria?.length ||
      !!dto.transactionCriteria?.length;

    const hasProductCriteria =
      !!dto.productInteraction?.length ||
      !!dto.stockLevel?.length ||
      !!dto.purchaseFrequency?.length ||
      !!dto.priceBased?.length;

    if (
      dto.BasicSegmentType === BasicSegmentType.USER_SEGMENT &&
      hasProductCriteria
    ) {
      throw new BadRequestException(
        'USER_SEGMENT cannot contain product criteria',
      );
    }

    if (
      dto.BasicSegmentType === BasicSegmentType.PRODUCT_SEGMENT &&
      hasUserCriteria
    ) {
      throw new BadRequestException(
        'PRODUCT_SEGMENT cannot contain user criteria',
      );
    }

    if (!hasUserCriteria && !hasProductCriteria) {
      throw new BadRequestException('At least one criteria must be provided');
    }
  }

  async deleteById(id: number) {
    const repo = await this.parentSegmentRepo.find({
      where: { id: id },
    });
    if (repo.length === 0) {
      throw new BadRequestException('Segment not found for this id.');
    }
    await this.parentSegmentRepo.delete(id);
    return {
      message: 'Segment Deleted Sucessfully!',
    };
  }

  async findById(id: number) {
    const repo = await this.parentSegmentRepo.findOne({
      where: {
        id,
      },
      relations: ['basicSegment', 'advanceSegment'],
    });
    if (!repo) {
      throw new BadRequestException('Segment not found for this id');
    }
    return repo;
  }
}
