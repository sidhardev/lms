import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coupon } from '../coupon.entity';
import { ApplyCouponDto } from '../dtos/apply-coupon.dto';
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateCouponDto } from '../dtos/update-coupon.dto';
import { CreateCouponDto } from '../dtos/create-coupon.dto';
import { Req } from '@nestjs/common';
@Injectable()
export class AdminCouponsService {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,
  ) {}

  async createCoupon(createCouponDto: CreateCouponDto, @Req() req: any) {
    const existingCoupon = await this.couponRepository.findOne({
      where: { code: createCouponDto.code },
    });
    if (existingCoupon) {
      throw new BadRequestException('Coupon code already exists.');
    }
      const coupon = this.couponRepository.create({
  code: createCouponDto.code,
  couponType: createCouponDto.couponType, 
  ruleType: createCouponDto.ruleType,
  rules: createCouponDto.rules,
  startAt: createCouponDto.startAt,
  endAt: createCouponDto.endAt,
  isActive: createCouponDto.isActive,
  createdBy: req.user.id,
});

    await this.couponRepository.save(coupon);
    return coupon;
  }

  async updateCoupon(id: number, updateCouponDto: UpdateCouponDto) {
    const coupon = await this.couponRepository.findOne({ where: { id } });
    if (!coupon) {
      throw new NotFoundException('Coupon not found.');
    }
    Object.assign(coupon, updateCouponDto);
    await this.couponRepository.save(coupon);
    return coupon;
  }

  findAll() {
    return this.couponRepository.find();
  }

  findOne(id: number) {
    return this.couponRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    const coupon = await this.couponRepository.findOne({ where: { id } });
    if (!coupon) {
      throw new NotFoundException('Coupon not found.');
    }
    await this.couponRepository.softRemove(coupon);
    return { message: 'Coupon removed successfully.' };
  }

  
}
