import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  createUser() {}

  async getUserByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async getUserById(userId: number) {
    return await this.prisma.user.findUnique({
      where: { userId },
    });
  }

  async getAllUsers() {
    return await this.prisma.user.findMany();
  }
}
