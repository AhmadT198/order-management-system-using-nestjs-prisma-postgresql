import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CartsRepository } from './carts.repository';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';
import { ProductsService } from 'src/products/products.service';
import { UsersRepository } from 'src/users/users.repository';
import { ProductsRepository } from 'src/products/products.repository';

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
})
export class CartsModule {}
