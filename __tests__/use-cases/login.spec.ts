import { describe, it, expect } from "vitest"

import { InMemoryUsersRepository } from "../repositories/in-memory-users"
import { makeUser } from "../mock/entities/user"
import { LoginError } from "../../src/use-cases/errors/login"
import { UsersRepository } from "../../src/use-cases/interfaces/users-repository"
import { JwtService } from "../../src/use-cases/interfaces/jwt"
import { makeJwtService } from "../mock/services/jwt"

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
    ) { }

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

describe("LoginUser", () => {
    it("should not be able to login with user that does not exists", async () => {
        const userRepository = new InMemoryUsersRepository()
        const jwtService = makeJwtService()
        const loginUseCase = new LoginUseCase(userRepository, jwtService)
        const user = makeUser({ email: "test@gmail.com", password: "pass123" })
        userRepository.save(user)

        const loginOrError = await loginUseCase.execute({
            email: "wrong@gmail.com",
            password: "pass123"
        })

        expect(loginOrError).toBeInstanceOf(LoginError)
        expect(loginOrError as LoginError).toEqual(new LoginError("Invalid credentials!"))
    })
    it("should not be able to login with wrong password", async () => {
        const userRepository = new InMemoryUsersRepository()
        const jwtService = makeJwtService()
        const loginUseCase = new LoginUseCase(userRepository, jwtService)
        const user = makeUser({ email: "test@gmail.com", password: "pass123" })
        userRepository.save(user)

        const loginOrError = await loginUseCase.execute({
            email: "test@gmail.com",
            password: "passWrong"
        })

        expect(loginOrError).toBeInstanceOf(LoginError)
        expect(loginOrError as LoginError).toEqual(new LoginError("Invalid credentials!"))
    })
    it("should be able to login", async () => {
        const userRepository = new InMemoryUsersRepository()
        const jwtService = makeJwtService()
        const loginUseCase = new LoginUseCase(userRepository, jwtService)
        const user = makeUser({ email: "test@gmail.com", password: "pass123" })
        userRepository.save(user)

        const loginOrError = await loginUseCase.execute({
            email: "test@gmail.com",
            password: "pass123"
        })

        expect(loginOrError).not.toBeInstanceOf(LoginError)

        const { accessToken } = loginOrError as LoginUseCaseReturn
        expect(accessToken).toBeTruthy()
    })
})