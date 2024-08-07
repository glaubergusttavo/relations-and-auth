import { describe, it, expect } from "vitest"
import { InMemoryUsersRepository } from "../repositories/in-memory-users";
import { UsersRepository } from "../../src/use-cases/interfaces/users-repository";
import { User } from "../../src/entities/users";
import { CreateUserError } from "../../src/entities/errors/create-user";

export interface CreateUserProps{
    name: string
    email: string
    password: string
}

export class CreateUserUseCase{
    constructor(
        private readonly usersRepository: UsersRepository
    ){}

    async execute(props: CreateUserProps){
        const createOrError = User.create(props)

        if(createOrError instanceof CreateUserError){
            return createOrError
        }
        await this.usersRepository.save(createOrError)
    }
}

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