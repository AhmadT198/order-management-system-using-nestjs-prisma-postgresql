import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthUser } from '../users/user.decorator';
import { AuthGuard } from '../users/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Controller('api/orders')
@ApiBearerAuth('bearer')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@AuthUser() user: any) {
    return this.ordersService.createOrder(user.userId);
  }

  @Get(':orderId')
  @UseGuards(AuthGuard)
  findOne(@Param('orderId') orderId: string) {
    return this.ordersService.getOrderById(+orderId);
  }
  @Put(':orderId/status')
  @UseGuards(AuthGuard)
  update(
    @Param('orderId') orderId: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return this.ordersService.updateOrderStatus(
      +orderId,
      updateOrderStatusDto.status,
    );
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.ordersService.remove(+id);
  // }
}
