import { Test, TestingModule } from '@nestjs/testing';
import { AdminCouponsService } from './admin-coupons.service';

describe('AdminService', () => {
  let service: AdminCouponsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminCouponsService],
    }).compile();

    service = module.get<AdminCouponsService>(AdminCouponsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
