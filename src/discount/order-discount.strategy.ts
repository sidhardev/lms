import { campaign } from "src/campaigns/campaign.entity";
import { ApplyCouponDto } from "src/coupons/dtos/apply-coupon.dto";
import { DiscountStrategy } from "./discount.strategy";

export class OrderDiscountStrategy implements DiscountStrategy {
    validate(input: ApplyCouponDto, campaign: campaign): void {
        
    }
    
  apply(input, campaign) {
    const discount =
      campaign.rules.mode === 'PERCENT'
        ? (input.orderAmount * campaign.rules.value) / 100
        : campaign.rules.value;

    return {
      orderDiscount: Math.min(discount, campaign.rules.maxDiscount),
    };
  }
}
