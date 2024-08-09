import { SignUpController } from "../../../infrastructure/controller/sign-up"
import { SignUpUseCase } from "../../../use-cases/sign-up"
import { PrismaUsersRepository } from "../../repositories/prisma/users"

export const makeSignUpController = () => {
    const userRepository = new PrismaUsersRepository()
    const signUpUseCase = new SignUpUseCase(userRepository)
    return new SignUpController(signUpUseCase);
}