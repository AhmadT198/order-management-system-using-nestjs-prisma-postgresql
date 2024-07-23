import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class UpdateCartItemQuantityDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({description:"ID of the product to be updated", required: true})
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @ApiProperty({description:"New quantity for the speicifed product."})
  quantity: number;
}
