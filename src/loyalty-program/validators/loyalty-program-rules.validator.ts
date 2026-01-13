import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  validate,
} from 'class-validator';
import { AccumulationRuleType, PointsMode } from '../enums/points.enum';
import { plainToClass } from 'class-transformer';
import { PointsPerRupeeDto } from '../dtos/points-per-ruppee.dto';
import { FirstPurchasePointsDto } from '../dtos/first_purchase.dto';
import { DailyLoginStreakDto } from '../dtos/daily-streak-login.dto';
import { CategoryBasedDto } from '../dtos/category-based.dto';

@ValidatorConstraint({ name: 'isLoyaltyProgramRule', async: true })
export class IsLoyaltyProgramRule implements ValidatorConstraintInterface {
  private message: string;
  async validate(rule: any, args: ValidationArguments) {
    this.message = '';
    if (!rule || typeof rule !== 'object' || !rule.ruleType) {
      return false;
    }

    const { ruleType } = rule;
    let dto: any;
    if (ruleType === AccumulationRuleType.POINTS_PER_RUPEE) {
      if (rule.mode === PointsMode.FIXED) {
        const allowedKeys = ['ruleType', 'mode', 'pointsEarned'];
        const extraKeys = Object.keys(rule).filter(
          (key) => !allowedKeys.includes(key),
        );
        if (extraKeys.length > 0) {
          this.message = `For POINTS_PER_RUPEE with FIXED mode, only 'pointsEarned', 'ruleType' and 'mode' are allowed. Invalid properties: ${extraKeys.join(
            ', ',
          )}`;
          return false;
        }
      } else if (rule.mode === PointsMode.DYNAMIC) {
        const requiredKeys = ['orderSpend', 'applyAfterDiscount'];
        const missingKeys = requiredKeys.filter((key) => rule[key] === undefined);
        if (missingKeys.length > 0) {
          this.message = `For POINTS_PER_RUPEE with DYNAMIC mode, the following properties are required: ${missingKeys.join(
            ', ',
          )}`;
          return false;
        }
      } else {
        this.message = `mode must be either FIXED or DYNAMIC for POINTS_PER_RUPEE`;
        return false;
      }
    }
    switch (ruleType) {
      case AccumulationRuleType.POINTS_PER_RUPEE:
        dto = plainToClass(PointsPerRupeeDto, rule);
        break;
      case AccumulationRuleType.FIRST_PURCHASE:
        dto = plainToClass(FirstPurchasePointsDto, rule);
        break;
      case AccumulationRuleType.DAILY_LOGIN_STREAK:
        dto = plainToClass(DailyLoginStreakDto, rule);
        break;
      case AccumulationRuleType.CATEGORY_BASED:
        dto = plainToClass(CategoryBasedDto, rule);
        break;
      default:
        return false;
    }

      const errors = await validate(dto);
      if (errors.length > 0) {
        this.message = errors
          .map((error) => Object.values(error.constraints ?? {}))
          .join(', ');
        return false;
      }
      return true;
    }

  defaultMessage(args: ValidationArguments) {
    return (
      this.message ||
      'Invalid loyalty program rule structure for rule type: ' +
        args.object['rules']?.ruleType
    );
  }
}
