import { IsNumber, IsNotEmpty } from "class-validator";

export class AddToCartDto {

    @IsNumber()
    userId: number;

    @IsNumber()
    productId: number;

    @IsNumber()
    quantity: number;

}
