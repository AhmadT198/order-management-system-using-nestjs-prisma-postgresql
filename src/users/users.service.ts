import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignInDto } from './dto/sign-in.dto';
import { UsersRepository } from './users.repository';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(private repo: UsersRepository) {}



  async signIn(signInDto: SignInDto){
    const {email, password} = signInDto;
    const user = await this.repo.getUserByEmail(email);
    if(!user) throw new BadRequestException('Email or Password are invalid.');

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) throw new BadRequestException('Email or Password are invalid.');

    const token = jwt.sign({userId:user.userId},"secretKey");
    return token;
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
