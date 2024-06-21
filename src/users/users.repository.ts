import { PrismaService } from "src/prisma/prisma.service";


export class UsersRepository {
    constructor(private prisma : PrismaService){}

    createUser() {

    }

    async getUserByEmail(email: string) {
        return await this.prisma.user.findUnique({where:{email}});
    }
}