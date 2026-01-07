import { Injectable, NotFoundException } from '@nestjs/common';
import { PointTransactionService } from 'src/rewards/point-transaction.service';
import { PointTransactionSource } from 'src/rewards/point-transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from './order.entity';

@Injectable()
export class OrdersService {
    constructor(@InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    private readonly pointTransactionService: PointTransactionService) {}

    createOrder(userId: number, amount: number) {
        console.log(userId)

        const order = this.orderRepository.create({
            user: {id: userId} as any,
            amount,
            status: OrderStatus.PENDING
        });
        return this.orderRepository.save(order);
    }

    

        async markOrderCompleted(orderId: number) {

                const  order = await this.orderRepository.findOne({where: {id: orderId}, relations: ['user']})

            if(!order) {
                throw new NotFoundException("Order not found")

            }
            if (order.status === OrderStatus.COMPLETED) {
                return order;
            }            
            order.status = OrderStatus.COMPLETED;
            await this.orderRepository.save(order)

            const pointsEarned = Math.floor(Number(order.amount / 10))
            console.log(pointsEarned)
            if (pointsEarned > 0) {
                await this.pointTransactionService.earnPoints({
                    userId: order.user.id,
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
