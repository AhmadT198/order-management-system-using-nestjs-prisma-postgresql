import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrdersRepository } from './orders.repository';
import { CartsService } from 'src/carts/carts.service';
import { CartsRepository } from 'src/carts/carts.repository';
import { CartsModule } from 'src/carts/carts.module';
import { ProductsService } from 'src/products/products.service';
import { ProductsRepository } from 'src/products/products.repository';
import { UsersService } from 'src/users/users.service';
import { UsersRepository } from 'src/users/users.repository';

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
