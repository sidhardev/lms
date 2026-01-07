import { Body, Controller, Get, Param, Post, Req, UseGuards} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';

@Controller('orders')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@ApiTags('Orders')
export class OrdersController {

    constructor(private readonly ordersService: OrdersService) {}

    @Post('create')
    async createOrder(@Body() CreateOrderDto: CreateOrderDto, @Req() req: any) {

      const order = await  this.ordersService.createOrder(req.user.id, CreateOrderDto.amount);
        return {
            status: true,
            order,
        }
    }




    @Post(':id/complete')
    async markOrderCompleted(@Req() req, @Param('id') orderId: number) {
        return this.ordersService.markOrderCompleted(orderId);
    }


}
