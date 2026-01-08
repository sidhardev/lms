import { BadRequestException } from "@nestjs/common";
import { DiscountStrategy } from "./discount.strategy";

export class FreeShippingStrategy implements DiscountStrategy {
  validate(input, campaign) {
    if (input.shippingCost <= 0) {
      throw new BadRequestException('No shipping charge');
    }
  }

  apply(input, campaign) {
    return {
      shippingDiscount: Math.min(
        input.shippingCost,
        campaign.rules.maxShippingDiscount,
      ),
    };
  }
}
