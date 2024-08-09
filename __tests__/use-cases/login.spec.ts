import { describe, it, expect } from "vitest"

import { InMemoryUsersRepository } from "../repositories/in-memory-users"
import { makeUser } from "../mock/entities/user"
import { LoginError } from "../../src/use-cases/errors/login"
import { makeJwtService } from "../mock/services/jwt"
import { LoginUseCase, LoginUseCaseReturn } from "../../src/use-cases/login"


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