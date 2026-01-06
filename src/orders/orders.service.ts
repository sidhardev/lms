import { Injectable, NotFoundException } from '@nestjs/common';
import { PointTransactionService } from 'src/rewards/point-transaction.service';
import { PointTransactionSource } from 'src/rewards/point-transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {
    constructor(@InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    private readonly pointTransactionService: PointTransactionService) {}

        async markOrderCompleted(orderId: number) {

                const  order = await this.orderRepository.findOne({where: {id: orderId}})

            if(!order) {
                throw new NotFoundException("Order not found")

            }
            if (order.status === "COMPLETED") {
                return order;
            }            
            order.status = "COMPLETED"
            await this.orderRepository.save(order)

            const pointsEarned = Math.floor(order.amount / 10)
            if (pointsEarned > 0) {
                await this.pointTransactionService.earnPoints({
                    userId: order.userId,
                    points: pointsEarned,
                    source: PointTransactionSource.ORDER,
                    referenceId: order.id,
                    metadata: {
                        orderId: order.id,
                        orderAmount: order.amount,
                        earnRate: '1 Point per 10RS'
                    }
                });
                        }
                return order;
        }

}
