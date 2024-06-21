import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartsRepository } from './carts.repository';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Injectable()
export class CartsService {
  constructor(private repo: CartsRepository){}

  async addToCart(addToCartDto: AddToCartDto) {
    return this.repo.addToCart(addToCartDto);
  }

  findAll() {
    return `This action returns all carts`;
  }

  async findCartItemsByUserId(id: number) {
    return await this.repo.getCartItemsByUserId(id);
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
