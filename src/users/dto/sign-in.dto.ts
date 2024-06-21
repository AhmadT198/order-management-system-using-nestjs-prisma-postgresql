import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";



export class SignInDto {
    @IsString()
    @ApiProperty({description: 'User email', required: true})
    email: string;

    @IsString()
    @ApiProperty({description: 'User password', required: true})
    password: string;
}