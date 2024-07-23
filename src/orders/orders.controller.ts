import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthUser } from 'src/users/user.decorator';
import { AuthGuard } from 'src/users/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

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
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
  //   return this.ordersService.update(+id, updateOrderDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.ordersService.remove(+id);
  // }
}
