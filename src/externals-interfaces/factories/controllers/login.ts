import { LoginUserController } from "../../../infrastructure/controller/login";
import { LoginUseCase } from "../../../use-cases/login";
import { PrismaUsersRepository } from "../../repositories/prisma/users"
import { JsonWebTokenService } from "../../services/jwt";

export const makeLoginUserController = () => {
    const userRepository = new PrismaUsersRepository();
    const jwtService = new JsonWebTokenService()
    const loginUseCase = new LoginUseCase(userRepository, jwtService);
    return new LoginUserController(loginUseCase)
    
}