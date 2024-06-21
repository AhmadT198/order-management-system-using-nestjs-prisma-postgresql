import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignInDto } from './dto/sign-in.dto';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('sign-in')
  @ApiBody({type:SignInDto})
  signIn(@Body() signInDto: SignInDto) {
    return this.usersService.signIn(signInDto);
  }

}
