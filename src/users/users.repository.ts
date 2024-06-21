import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UsersRepository {
    constructor(private readonly prisma : PrismaService){}

    createUser() {

    }
    
    async getUserByEmail(email: string) {
        return await this.prisma.user.findUnique({
            where: {email}
        })
    }
}