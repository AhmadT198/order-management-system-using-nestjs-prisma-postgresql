import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/updateCartRequest';
import { CartsRepository } from './carts.repository';
import { AddToCartRequest } from './dto/addToCartRequest.dto';
import { CartItemDto } from './dto/cartItem.dto';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class CartsService {
  constructor(
    private repo: CartsRepository,
    private userService: UsersService,
    private productService: ProductsService,
  ) {}

  async addToCart(userId: number, productId: number, quantity: number) {
    return await this.repo.addToCart(userId, productId, quantity);
  }

  findAll() {
    return `This action returns all carts`;
  }
  async isProductInUserCart(userId: number, productId: number) {
    const user = await this.userService.getUserById(userId);
    const product = await this.productService.getProductById(productId);

    return await this.repo.isProductInUserCart(userId, productId);
  }
  async findCartItemsByUserId(id: number) {
    return await this.repo.getCartItemsByUserId(id);
  }

  async update(userId: number, productId: number, quantity: number) {
    if (!(await this.isProductInUserCart(userId, productId)))
      throw new BadRequestException(
        "Product does not exist in the current user's cart.",
      );

    if (quantity == 0) {
      return await this.deleteItemFromCart(userId, productId);
    }

    return await this.repo.updateCart(userId, productId, quantity);
  }

  async deleteItemFromCart(userId: number, productId: number) {
    if (!(await this.isProductInUserCart(userId, productId)))
      throw new BadRequestException(
        "Product does not exist in the current user's cart.",
      );

    return await this.repo.deleteItemFromCart(userId, productId);
  }
}
