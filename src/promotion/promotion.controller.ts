import { Body, Controller, Post } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';

@Controller('promotion')
export class PromotionController {
    constructor(private readonly promotionService: PromotionService) {}

    @Post()
    create(@Body() createPromotionDto: CreatePromotionDto) {
        return this.promotionService.create(createPromotionDto);
    }

}
