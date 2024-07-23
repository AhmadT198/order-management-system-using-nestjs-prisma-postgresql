import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CartsRepository } from './carts.repository';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module';
import { ProductsService } from '../products/products.service';
import { UsersRepository } from '../users/users.repository';
import { ProductsRepository } from '../products/products.repository';

@Module({
  controllers: [CartsController],
  providers: [
    CartsService,
    CartsRepository,
    UsersService,
    UsersRepository,
    ProductsService,
    ProductsRepository,
  ],
  imports: [PrismaModule, UsersModule, ProductsModule],
  exports:[CartsService, CartsRepository]
})
export class CartsModule {}
