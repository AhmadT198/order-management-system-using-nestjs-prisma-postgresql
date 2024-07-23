import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Headers,
  UseGuards,
  Put,
  ForbiddenException,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/updateCartRequest';
import { AddToCartRequest } from './dto/addToCartRequest.dto';
import { AuthGuard } from 'src/users/auth.guard';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthUser } from 'src/users/user.decorator';
import { CartItemDto } from './dto/cartItem.dto';
import { DeleteItemFromCartDto } from './dto/deleteItemFromCart.dto';
import { UpdateCartItemQuantityDto } from './dto/updateCartItemQuantity.dto';

@Controller('api/carts')
@ApiBearerAuth('bearer')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @ApiBody({ type: AddToCartRequest })
  @UseGuards(AuthGuard)
  @Post('add')
  async addToCart(
    @Body() addToCartDto: AddToCartRequest,
    @AuthUser() user: any,
  ) {
    return this.cartsService.addToCart(
      user.userId,
      addToCartDto.productId,
      addToCartDto.quantity,
    );
  }

  @UseGuards(AuthGuard)
  @Get(':userId')
  findCartItemsByUserId(
    @Param('userId', ParseIntPipe) id: number,
    @AuthUser() user: any,
  ) {
    if (user?.userId !== id) {
      throw new ForbiddenException();
    }
    return this.cartsService.findCartItemsByUserId(+id);
  }

  @Put('update')
  @UseGuards(AuthGuard)
  @ApiBody({ type: UpdateCartItemQuantityDto })
  updateCartItemQuantity(
    @Body() updateCartDto: UpdateCartItemQuantityDto,
    @AuthUser() user: any,
  ) {
    return this.cartsService.update(
      user.userId,
      updateCartDto.productId,
      updateCartDto.quantity,
    );
  }

  @Delete('remove')
  @UseGuards(AuthGuard)
  @ApiBody({ type: DeleteItemFromCartDto })
  removeCartItem(
    @Body() deleteItemFromCartDto: DeleteItemFromCartDto,
    @AuthUser() user: any,
  ) {
    return this.cartsService.deleteItemFromCart(
      user.userId,
      deleteItemFromCartDto.productId,
    );
  }
}
