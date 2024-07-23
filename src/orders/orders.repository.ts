import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersRepository {
  constructor(private prisma: PrismaService) {}

  async createOrder(
    userId: number,
    productsList: { productId: number; quantity: number; price: number }[],
  ) {
    return await this.prisma.$transaction(async (tx) => {
      // Get orderItems and compute Total price
      const orderItems = productsList.map((product) => {
        return {
          productId: product.productId,
          quantity: product.quantity,
          total: product.price * product.quantity,
        };
      });
      const total = orderItems
        .map((orderItem) => orderItem.total)
        .reduce((acc, currOrderItemTotal) => acc + currOrderItemTotal);

      // Init Order
      const { orderId } = await tx.order.create({
        data: {
          status: 'pending',
          userId,
          total: total,
        },
      });

      // Add Order Items
      await tx.orderProducts.createMany({
        data: orderItems.map((orderItem) => {
          return { orderId, ...orderItem };
        }),
      });

      return tx.order.findUnique({
        where: { orderId },
        include: {
          products: true,
        },
      });
    });
  }

  async getOrderById(orderId: number) {
    return await this.prisma.order.findUnique({
      where: { orderId },
      include: {
        products: true,
      },
    });
  }

  async updateOrderStatus(orderId: number, status: string) {
    return await this.prisma.order.update({
      where: { orderId },
      data: { status },
    });
  }
}
