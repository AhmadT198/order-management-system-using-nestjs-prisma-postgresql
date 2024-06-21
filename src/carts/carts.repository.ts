import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AddToCartDto } from "./dto/add-to-cart.dto";


@Injectable()
export class CartsRepository {
    constructor(private prisma : PrismaService){}


    async addToCart(addToCartDto: AddToCartDto){

        // Check if cart exists
        const {userId, productId, quantity} = addToCartDto;
        // Check if user exits
        const user = await this.prisma.user.findUnique({where:{userId}});
        if(!user) throw new NotFoundException("User does not exist.");

        const product = await this.prisma.product.findUnique({where:{productId}});
        if(!product) throw new NotFoundException("Product does not exist.");

        let cart = await this.prisma.cart.findUnique({where:{userId}})
        if(!cart) {
            cart = await this.prisma.cart.create({
                data: {
                    userId
                }
            })
        }

        // Check if product is in the cart
        const productInCart = await this.prisma.cartProducts.findUnique({
            where: {
                cartId_productId: {
                    cartId:cart.cartId,
                    productId
                }
            }
        })
        if(!productInCart){
            // If no, add it
            return this.prisma.cartProducts.create({
                data: {
                    cartId: cart.cartId,
                    productId,
                    quantity
                }
            })
        } else {
            // If yes, increment its quantity
            return this.prisma.cartProducts.update({
                where: {
                    cartId_productId: {
                        cartId:cart.cartId,
                        productId
                    }
                },
                data : {
                    quantity: {
                        increment: quantity
                    }
                }
            })
        }

    }

    async getCartItemsByUserId(userId: number){
        const cart = await this.prisma.cart.findUnique({
            where: { userId }
        });
        const cartItems = this.prisma.cartProducts.findMany({
            where:{cartId: cart.cartId},
            include:{
                product: true
            },
        })
        return cartItems
    }

    async updateCart() {

    }

    async deleteCart() {

    }
}