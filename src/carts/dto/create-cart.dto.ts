import { IsNumber, IsNotEmpty } from "class-validator";

export class CreateCartDto {

    @IsNotEmpty()
    @IsNumber()
    userId : Number;

}
