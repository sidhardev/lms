import { Test, TestingModule } from '@nestjs/testing';
import { ShippingCampaignController } from './shipping_campaign.controller';

describe('ShippingCampaignController', () => {
  let controller: ShippingCampaignController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShippingCampaignController],
    }).compile();

    controller = module.get<ShippingCampaignController>(
      ShippingCampaignController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
