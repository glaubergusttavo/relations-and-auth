import { describe, it, expect } from "vitest";

import { makeUser } from "../mock/entities/user";
import { InMemoryUsersRepository } from "../repositories/in-memory-users";
import { SignUpError } from "../../src/use-cases/errors/sign-up";
import { SignUpUseCase } from "../../src/use-cases/sign-up";

describe("SignUpUseCase", () => {
    it("should not be able to signUp with user that already exists", async () => {
        const usersRepository = new InMemoryUsersRepository();
        const signUpUseCase = new SignUpUseCase(usersRepository);

        const user = makeUser({ email: "same@gmail.com" })
        usersRepository.save(user)

        const singUpOrError = await signUpUseCase.execute({
            name: "testName",
            email: "same@gmail.com",
            password: "pass123"
        })

        expect(singUpOrError).toBeInstanceOf(SignUpError)
        expect(singUpOrError as SignUpError).toEqual(new SignUpError("User already exists!"))
    })
    it("should be able to signUp", async () => {
        const usersRepository = new InMemoryUsersRepository();
        const signUpUseCase = new SignUpUseCase(usersRepository);

        const singUpOrError = await signUpUseCase.execute({
            name: "testName",
            email: "same@gmail.com",
            password: "pass123"
        })

        expect(usersRepository.users).toHaveLength(1)
    })
})