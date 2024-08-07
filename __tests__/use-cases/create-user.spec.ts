import { describe, it, expect } from "vitest"

import { InMemoryUsersRepository } from "../repositories/in-memory-users";
import { CreateUserUseCase } from "../../src/use-cases/create-user";

describe("CreateUserUseCase", () => {
    describe("createUser", () => {
        it("should be able to create user", async () => {
            const usersRepository = new InMemoryUsersRepository();
            const useCase = new CreateUserUseCase(usersRepository);

            await useCase.execute({
                name: "nameTest",
                email: "test@gmail.com",
                password: "12345"
            })

            expect(usersRepository.users).toHaveLength(1)
        })
    })
})