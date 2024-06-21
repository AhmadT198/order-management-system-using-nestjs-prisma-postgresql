import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignInDto } from './dto/sign-in.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private repo: UsersRepository,
    private jwtService: JwtService
  ) {}

  async signIn(signInDto: SignInDto){
    const {email, password} = signInDto;
    const user = await this.repo.getUserByEmail(email);
    if(!user) throw new BadRequestException('Email or Password are invalid.');

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) throw new BadRequestException('Email or Password are invalid.');

    return {
      access_token: await this.jwtService.signAsync({userId:user.userId})
    };
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
