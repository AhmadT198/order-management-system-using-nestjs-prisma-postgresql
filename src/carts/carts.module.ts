import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CartsRepository } from './carts.repository';

@Module({
  controllers: [CartsController],
  providers: [CartsService, CartsRepository],
  imports:[PrismaModule]
})
export class CartsModule {}
