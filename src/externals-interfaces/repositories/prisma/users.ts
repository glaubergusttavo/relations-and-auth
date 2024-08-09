import { CreateUserError } from "../../../entities/errors/create-user";
import { User } from "../../../entities/users";
import { UsersRepository } from "../../../use-cases/interfaces/users-repository";
import { prisma } from "../../prisma";

export class PrismaUsersRepository implements UsersRepository {
   
    async save(user: User) {
        await prisma.user.create({
            data: {
                id: user.getId,
                name: user.getName,
                email: user.getEmail,
                password: user.getPassword
            }
        })
    }

    async getAll() {
        const dbUsers = await prisma.user.findMany();

        return dbUsers.map(user => {
            return User.create({
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password
            }) as User
        })
    }

    async findByEmail(email: string) {

        const userEmail = await prisma.user.findFirst({
            where: { email: email }
        })
        if (userEmail) {
            return User.create({
                id: userEmail.id,
                name: userEmail.name,
                email: userEmail.email,
                password: userEmail.password
            }) as User
        }
        return undefined;
    }

    async update(user: User) {
        await prisma.user.update({
           
            where: {
                email: user.getEmail
            },

            data: {
                email: user.getEmail,
                name: user.getName
            }
        })

    }

    async findById(id: string) {

        const userId = await prisma.user.findFirst({
            where: { id: id }
        })
        if (userId) {
            return User.create({
                id: userId.id,
                name: userId.name,
                email: userId.email,
                password: userId.password
            }) as User
        }
        return undefined;
    }
}