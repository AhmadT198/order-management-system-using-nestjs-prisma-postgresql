import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class DeleteItemFromCartDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({description:"Id of the product to be deleted", required: true})
  productId: number;
}
