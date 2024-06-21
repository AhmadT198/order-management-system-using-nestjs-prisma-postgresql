import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/updateCartRequest';
import { CartsRepository } from './carts.repository';
import { AddToCartRequest } from './dto/addToCartRequest.dto';
import { CartItemDto } from './dto/cartItem.dto';

@Injectable()
export class CartsService {
  constructor(private repo: CartsRepository){}

  async addToCart(cartDto: CartItemDto) {
    return this.repo.addToCart(cartDto);
  }

  findAll() {
    return `This action returns all carts`;
  }

  async findCartItemsByUserId(id: number) {
    return await this.repo.getCartItemsByUserId(id);
  }

  update(updateCartDto: CartItemDto) {
    return this.repo.updateCart(updateCartDto);
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
