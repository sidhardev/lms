import { DiscountType } from "src/campaigns/campaign.entity";
import { FreeShippingStrategy } from "./free-shipping.strategy";
import { DiscountStrategy } from "./discount.strategy";
import { BadRequestException, Injectable } from "@nestjs/common";
import { RewardStrategy } from "./reward.strategy";
import { OrderDiscountStrategy } from "./order-discount.strategy";

@Injectable()
export class DiscountResolver {
  resolve(type: DiscountType): DiscountStrategy {
    switch (type) {
      case DiscountType.REWARD:
        return new RewardStrategy();

      case DiscountType.FREE_SHIPPING:
        return new FreeShippingStrategy();

      case DiscountType.ORDER_DISCOUNT:
        return new OrderDiscountStrategy();

      default:
        throw new BadRequestException('Invalid discount type');
    }
  }
}
