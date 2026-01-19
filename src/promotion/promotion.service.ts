import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Promotion } from './promotion.entity';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { DiscountType } from 'src/campaigns/order-campaign/campaign.entity';
import { DiscountMode } from 'src/campaigns/order-campaign/rules/rules.enum';
import { CampaignNotification } from 'src/notifications/notification.entity';

@Injectable()
export class PromotionService {

    constructor(@InjectRepository(Promotion) private promotionRepository: Repository<Promotion>) {}

  async create(dto: CreatePromotionDto): Promise<Promotion> {
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
    throw new BadRequestException('Cannot specify both discountAmount and disocuntPercent');
  }

  if (dto.discountAmount && dto.maxDiscount && dto.discountAmount > dto.maxDiscount) {
    throw new BadRequestException('discountAmount cannot be greater than maxDiscount');
  }

  if (dto.disocuntPercent && dto.maxDiscount && dto.disocuntPercent > dto.maxDiscount) {
    throw new BadRequestException('disocuntPercent cannot be greater than maxDiscount');
  }

  return this.promotionRepository.save(promotion);
}

findAll(page, limit) {
  return this.promotionRepository.find({
    skip: (page - 1) * limit,
      take: limit,
  })
}


}
