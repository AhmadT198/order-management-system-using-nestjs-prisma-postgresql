import { IsNumber } from "class-validator";

export class CartItemDto{
    @IsNumber()
    userId: number;
    
    @IsNumber()
    productId: number;

    @IsNumber()
    quantity: number;
}