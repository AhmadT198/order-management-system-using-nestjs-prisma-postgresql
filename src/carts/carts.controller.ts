import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Headers, UseGuards, Put } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/updateCartRequest';
import { AddToCartRequest } from './dto/addToCartRequest.dto';
import { AuthGuard } from 'src/users/auth.guard';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthUser } from 'src/users/user.decorator';
import { CartItemDto } from './dto/cartItem.dto';

@Controller('api/carts')
@ApiBearerAuth('bearer')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @ApiBody({type: AddToCartRequest})
  @UseGuards(AuthGuard)
  @Post('add')
  async addToCart(@Body() addToCartDto: AddToCartRequest, @AuthUser() user: any) {
    const cartDto = new CartItemDto();
    cartDto.userId = user.userId;
    cartDto.productId = addToCartDto.productId;
    cartDto.quantity = addToCartDto.quantity;
    return this.cartsService.addToCart(cartDto);
  }

  @UseGuards(AuthGuard)
  @Get(':userId')
  findCartItemsByUserId(@Param('userId',ParseIntPipe) id: number) {
    return this.cartsService.findCartItemsByUserId(+id);
  }

  @Put("update")
  @UseGuards(AuthGuard)
  @ApiBody({type: AddToCartRequest})
  updateCartItemQuantity(@Body() updateCartDto: AddToCartRequest, @AuthUser() user: any){
    const cartDto = new CartItemDto();
    cartDto.userId = user.userId;
    cartDto.productId = updateCartDto.productId;
    cartDto.quantity = updateCartDto.quantity;
    return this.cartsService.update(cartDto);
  }


}
