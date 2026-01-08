import { BadRequestException } from "@nestjs/common";
import { DiscountStrategy } from "./discount.strategy";

export class RewardStrategy implements DiscountStrategy {
  validate(input, campaign) {
    if (input.orderAmount < campaign.rules.minOrderValue) {
      throw new BadRequestException('Minimum order not met');
    }
  }

  apply(input, campaign) {
    return {
      rewardPoints: campaign.rules.value,
    };
  }
}
