import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Promotion } from './entites/promotion.entity';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { CampaignNotification } from 'src/notifications/entities/notification.entity';

@Injectable()
export class PromotionService {
  constructor(
    @InjectRepository(Promotion)
    private promotionRepository: Repository<Promotion>,
  ) {}

  async create(dto: CreatePromotionDto): Promise<Promotion> {
    if (new Date(dto.startDate) >= new Date(dto.endDate)) {
      throw new BadRequestException('End date must be after start date');
    }
    const promotion = new Promotion();
    promotion.name = dto.name;
    promotion.startDate = dto.startDate;
    promotion.endDate = dto.endDate;
    promotion.selectedSegments = dto.selectedSegments;
    promotion.discountType = dto.discountType;
    promotion.disocuntPercent = dto.disocuntPercent;
    promotion.discountAmount = dto.discountAmount;
    promotion.maxDiscount = dto.maxDiscount;

    if (dto.notifications) {
      promotion.notifications = dto.notifications.map((n) => {
        const notification = new CampaignNotification();
        Object.assign(notification, n);
        return notification;
      });
    }

    if (dto.discountAmount && dto.disocuntPercent) {
      throw new BadRequestException(
        'Cannot specify both discountAmount and disocuntPercent',
      );
    }

    if (
      dto.discountAmount &&
      dto.maxDiscount &&
      dto.discountAmount > dto.maxDiscount
    ) {
      throw new BadRequestException(
        'discountAmount cannot be greater than maxDiscount',
      );
    }

    if (
      dto.disocuntPercent &&
      (dto.disocuntPercent < 0 || dto.disocuntPercent > 100)
    ) {
      throw new BadRequestException(
        'disocuntPercent must be between 0 and 100',
      );
    }

    return this.promotionRepository.save(promotion);
  }

  findAll(page: number, limit: number) {
    return this.promotionRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  delete(id: number) {
    this.promotionRepository.delete(id);
    return {
      status: true,
      message: 'Promotion Deleted sucessfully',
    };
  }
}
