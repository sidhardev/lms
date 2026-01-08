import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coupon } from './coupon.entity';
import { CreateCouponDto } from './dtos/create-coupon.dto';
import { UpdateCouponDto } from './dtos/update-coupon.dto';

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,
  ) {}



  async findOne(id: number) {
    const coupon = await this.couponRepository.findOne({ where: { id } });
    if (!coupon) {
      throw new NotFoundException('Coupon not found');
    }
    return coupon;
  }

  async update(id: number, dto: UpdateCouponDto) {
    const coupon = await this.findOne(id);
    Object.assign(coupon, dto);
    return this.couponRepository.save(coupon);
  }

  async updateStatus(id: number, isActive: boolean) {
    const coupon = await this.findOne(id);
    coupon.isActive = isActive;
    return this.couponRepository.save(coupon);
  }

  async remove(id: number) {
    const coupon = await this.findOne(id);
    await this.couponRepository.remove(coupon);
    return { status: true };
  }

  async findActive() {
    const now = new Date();
    return this.couponRepository
      .createQueryBuilder('coupon')
      .where('coupon.isActive = true')
      .andWhere('coupon.startAt <= :now', { now })
      .andWhere('coupon.endAt >= :now', { now })
      .getMany();
  }
}
