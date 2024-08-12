import { CreateUserController } from "../../../infrastructure/controller/create-user";
import { CreateUserUseCase } from "../../../use-cases/create-user";
import { PrismaUsersRepository } from "../../repositories/prisma/users"

export const makeCreateUserController  = () =>{
    const usersRepository = new PrismaUsersRepository();
    const createUserUseCase = new CreateUserUseCase(usersRepository);
    return new CreateUserController(createUserUseCase);
}