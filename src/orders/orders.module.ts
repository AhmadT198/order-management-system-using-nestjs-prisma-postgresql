import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { OrdersRepository } from './orders.repository';
import { CartsService } from '../carts/carts.service';
import { CartsRepository } from '../carts/carts.repository';
import { CartsModule } from '../carts/carts.module';
import { ProductsService } from '../products/products.service';
import { ProductsRepository } from '../products/products.repository';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../users/users.repository';

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrdersRepository,
    CartsService,
    CartsRepository,
    ProductsService,
    ProductsRepository,
    UsersService,
    UsersRepository
  ],
  imports: [PrismaModule, CartsModule],
})
export class OrdersModule {}
