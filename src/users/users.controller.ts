import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignInDto } from './dto/sign-in.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('all-test-users')
  @ApiTags('Get All Test Users for Testing Purposes')
  async getAllUsers() {
    const users = await this.usersService.findAll();

    return users.map((user) => {
      return { userId: user.userId, email: user.email, password: 'password' };
    });
  }

  @Post('sign-in')
  @ApiTags('Sign In')
  @ApiBody({ type: SignInDto })
  signIn(@Body() signInDto: SignInDto) {
    return this.usersService.signIn(signInDto);
  }
}
