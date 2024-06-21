import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersRepository } from './users.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  providers: [UsersService,UsersRepository],
  imports:[PrismaModule,
    JwtModule.register({
      global: true,
      secret: "secretKey",
      signOptions: {expiresIn: '60m'}
    })
  ]
})
export class UsersModule {}
