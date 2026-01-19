import { Test, TestingModule } from '@nestjs/testing';
import { ShippingCampaignService } from './shipping_campaign.service';

describe('ShippingCampaignService', () => {
  let service: ShippingCampaignService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShippingCampaignService],
    }).compile();

    service = module.get<ShippingCampaignService>(ShippingCampaignService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
