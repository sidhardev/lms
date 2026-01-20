import { CreateLoyaltyProgramDto } from '../dtos/create-loyalty-program.dto';
import { AccumulationRuleType, PointsMode } from '../../enums/points.enum';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

describe('CreateLoyaltyProgramDto Validation', () => {
  it('should pass for valid DYNAMIC rule for POINTS_PER_RUPEE', async () => {
    const dto = {
      name: 'test',
      startAt: new Date().toISOString(),
      endAt: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
      rules: {
        ruleType: AccumulationRuleType.POINTS_PER_RUPEE,
        mode: PointsMode.DYNAMIC,
        orderSpend: 100,
        pointsEarned: 10,
        applyAfterDiscount: true,
      },
    };
    const loyaltyProgramDto = plainToClass(CreateLoyaltyProgramDto, dto);
    const errors = await validate(loyaltyProgramDto);
    expect(errors.length).toBe(0);
  });

  it('should fail for DYNAMIC rule for POINTS_PER_RUPEE missing required fields', async () => {
    const dto = {
      name: 'test',
      startAt: new Date().toISOString(),
      endAt: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
      rules: {
        ruleType: AccumulationRuleType.POINTS_PER_RUPEE,
        mode: PointsMode.DYNAMIC,
        pointsEarned: 10,
      },
    };
    const loyaltyProgramDto = plainToClass(CreateLoyaltyProgramDto, dto);
    const errors = await validate(loyaltyProgramDto);
    expect(errors.length).toBeGreaterThan(0);
    const rulesError = errors.find((e) => e.property === 'rules');
    expect(rulesError.constraints.isLoyaltyProgramRule).toContain(
      'For POINTS_PER_RUPEE with DYNAMIC mode, the following properties are required: orderSpend, applyAfterDiscount',
    );
  });

  it('should pass for valid FIXED rule for POINTS_PER_RUPEE', async () => {
    const dto = {
      name: 'test',
      startAt: new Date().toISOString(),
      endAt: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
      rules: {
        ruleType: AccumulationRuleType.POINTS_PER_RUPEE,
        mode: PointsMode.FIXED,
        pointsEarned: 100,
      },
    };
    const loyaltyProgramDto = plainToClass(CreateLoyaltyProgramDto, dto);
    const errors = await validate(loyaltyProgramDto);
    expect(errors.length).toBe(0);
  });

  it('should fail for FIXED rule for POINTS_PER_RUPEE with extra fields', async () => {
    const dto = {
      name: 'test',
      startAt: new Date().toISOString(),
      endAt: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
      rules: {
        ruleType: AccumulationRuleType.POINTS_PER_RUPEE,
        mode: PointsMode.FIXED,
        pointsEarned: 100,
        orderSpend: 1000,
      },
    };
    const loyaltyProgramDto = plainToClass(CreateLoyaltyProgramDto, dto);
    const errors = await validate(loyaltyProgramDto);
    expect(errors.length).toBeGreaterThan(0);
    const rulesError = errors.find((e) => e.property === 'rules');
    expect(rulesError.constraints.isLoyaltyProgramRule).toContain(
      'Invalid properties: orderSpend',
    );
  });
});
