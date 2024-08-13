import { LoginError } from "./errors/login"
import { JwtService } from "./interfaces/jwt"
import { UsersRepository } from "./interfaces/users-repository"

export interface LoginProps {
    email: string
    password: string
}

export interface LoginUseCaseReturn {
    accessToken: string
}

export class LoginUseCase {
    constructor(
        private readonly userRepository: UsersRepository,
        private readonly jwtService: JwtService
    ) {}

    async execute(props: LoginProps): Promise <LoginError | LoginUseCaseReturn> {
        const userExist = await this.userRepository.findByEmail(props.email)

        if (!userExist) {
            return new LoginError("Invalid credentials!")
        }
        if (userExist.getPassword !== props.password) {
            return new LoginError("Invalid credentials!")
        }
        const accessToken = await this.jwtService.createToken(userExist.getId)
        return {
            accessToken: accessToken
        }
    }
}