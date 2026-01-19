import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateLoyaltyProgramDto } from './create-loyalty-program.dto';
import { AccumulationRuleType, PointsMode } from '../enums/points.enum';
import { recurringValidDays } from 'src/campaigns/order-campaign/discount-campaign.entity';

describe('CreateLoyaltyProgramDto', () => {
  const validBaseDto = {
    name: 'Test Program',
    startAt: '2026-01-01T00:00:00Z',
    endAt: '2026-12-31T23:59:59Z',
  };

  it('should validate a correct POINTS_PER_RUPEE rule', async () => {
    const dto = plainToClass(CreateLoyaltyProgramDto, {
      ...validBaseDto,
      rules: {
        ruleType: AccumulationRuleType.POINTS_PER_RUPEE,
        mode: PointsMode.DYNAMIC,
        orderSpend: 100,
        pointsEarned: 10,
        applyAfterDiscount: true,
      },
    });

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation for an incorrect POINTS_PER_RUPEE rule', async () => {
    const dto = plainToClass(CreateLoyaltyProgramDto, {
      ...validBaseDto,
      rules: {
        ruleType: AccumulationRuleType.POINTS_PER_RUPEE,
        mode: 'INVALID_MODE', // Invalid mode
        orderSpend: -100, // Invalid spend
        pointsEarned: 10,
        applyAfterDiscount: true,
      },
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(JSON.stringify(errors)).toContain(
      'Invalid loyalty program rule structure',
    );
  });

  it('should validate a correct FIRST_PURCHASE rule', async () => {
    const dto = plainToClass(CreateLoyaltyProgramDto, {
      ...validBaseDto,
      rules: {
        ruleType: AccumulationRuleType.FIRST_PURCHASE,
        pointsEarned: 100,
      },
    });

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation for an incorrect FIRST_PURCHASE rule', async () => {
    const dto = plainToClass(CreateLoyaltyProgramDto, {
      ...validBaseDto,
      rules: {
        ruleType: AccumulationRuleType.FIRST_PURCHASE,
        pointsEarned: -100, // Invalid points
      },
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(JSON.stringify(errors)).toContain(
      'Invalid loyalty program rule structure',
    );
  });

  it('should validate a correct DAILY_LOGIN_STREAK rule', async () => {
    const dto = plainToClass(CreateLoyaltyProgramDto, {
      ...validBaseDto,
      rules: {
        ruleType: AccumulationRuleType.DAILY_LOGIN_STREAK,
        days: 5,
        pointsEarned: 50,
      },
    });

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation for an incorrect DAILY_LOGIN_STREAK rule', async () => {
    const dto = plainToClass(CreateLoyaltyProgramDto, {
      ...validBaseDto,
      rules: {
        ruleType: AccumulationRuleType.DAILY_LOGIN_STREAK,
        days: -5, // Invalid days
        pointsEarned: 50,
      },
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(JSON.stringify(errors)).toContain(
      'Invalid loyalty program rule structure',
    );
  });

  it('should validate a correct CATEGORY_BASED rule', async () => {
    const dto = plainToClass(CreateLoyaltyProgramDto, {
      ...validBaseDto,
      rules: {
        ruleType: AccumulationRuleType.CATEGORY_BASED,
        categories: [
          {
            categoryId: 'electronics',
            pointsEarned: 100,
          },
          {
            categoryId: 'clothing',
            pointsEarned: 50,
          },
        ],
      },
    });

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation for an incorrect CATEGORY_BASED rule', async () => {
    const dto = plainToClass(CreateLoyaltyProgramDto, {
      ...validBaseDto,
      rules: {
        ruleType: AccumulationRuleType.CATEGORY_BASED,
        categories: [
          {
            categoryId: 'electronics',
            pointsEarned: -100, // Invalid points
          },
        ],
      },
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(JSON.stringify(errors)).toContain(
      'Invalid loyalty program rule structure',
    );
  });

  it('should fail validation for an unknown ruleType', async () => {
    const dto = plainToClass(CreateLoyaltyProgramDto, {
      ...validBaseDto,
      rules: {
        ruleType: 'UNKNOWN_RULE_TYPE',
      },
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(JSON.stringify(errors)).toContain(
      'Invalid loyalty program rule structure',
    );
  });

  it('should pass validation when rules are not provided', async () => {
    const dto = plainToClass(CreateLoyaltyProgramDto, {
      ...validBaseDto,
    });

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should validate all other fields correctly', async () => {
    const dto = plainToClass(CreateLoyaltyProgramDto, {
      ...validBaseDto,
      description: 'A great program',
      validDays: recurringValidDays.ALL,
      validityStartTime: '09:00',
      validityEndTime: '17:00',
    });

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation for invalid base fields', async () => {
    const dto = plainToClass(CreateLoyaltyProgramDto, {
      name: '', // Invalid name
      startAt: 'not-a-date', // Invalid date
      endAt: '2026-12-31T23:59:59Z',
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
