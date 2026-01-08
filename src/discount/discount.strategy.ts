import { campaign, CampaignStatus } from "src/campaigns/campaign.entity";
import { ApplyCouponDto } from "src/coupons/dtos/apply-coupon.dto";

export interface DiscountStrategy {
  validate(input: ApplyCouponDto, campaign: campaign): void;
  apply(input: ApplyCouponDto, campaign: campaign): any;
}
