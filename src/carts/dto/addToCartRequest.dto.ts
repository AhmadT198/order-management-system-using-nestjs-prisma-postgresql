import { IsNumber, IsNotEmpty, Min } from "class-validator";

export class AddToCartRequest {

    @IsNumber()
    productId: number;

    @IsNumber()
    @Min(0)
    quantity: number;

}
