import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersRepository } from './orders.repository';
import { CartsService } from 'src/carts/carts.service';

@Injectable()
export class OrdersService {
  constructor(
    private repo: OrdersRepository,
    private cartsService: CartsService,
  ) {}
  async createOrder(userId: number) {
    const cartItems = await this.cartsService.findCartItemsByUserId(userId);
    if (cartItems.length === 0) throw new BadRequestException('Cart is Empty.');

    const productsList = cartItems.map((cartItem) => {
      return {
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        price: cartItem.product.price,
      };
    });
    return this.repo.createOrder(userId, productsList);
  }

  async getOrderById(orderId: number) {
    const order = await this.repo.getOrderById(orderId);
    if (!order) throw new BadRequestException('Order not found.');
    return order;
  }

  async updateOrderStatus(orderId: number, status: string) {
    if (
      status !== 'pending' &&
      status !== 'completed' &&
      status !== 'cancelled'
    )
      throw new BadRequestException('Invalid status.');
    const order = await this.repo.getOrderById(orderId);
    if (!order) throw new BadRequestException('Order not found.');
    
    return await this.repo.updateOrderStatus(orderId, status);
  }
  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
