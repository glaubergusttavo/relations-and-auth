import { describe, it, expect } from "vitest";

import { makeUser } from "../mock/entities/user";
import { InMemoryUsersRepository } from "../repositories/in-memory-users";
import { UsersRepository } from "../../src/use-cases/interfaces/users-repository";
import { SignUpError } from "../../src/use-cases/errors/sign-up";
import { User } from "../../src/entities/users";
import { CreateUserError } from "../../src/entities/errors/create-user";

export interface SingUpProps{
    name: string
    email: string
    password: string
}

export class SignUpUseCase{
    constructor(
        private readonly userRepository: UsersRepository
    ){}

    async execute(props: SingUpProps): Promise < SignUpError | undefined>{

        const userExist = await this.userRepository.findByEmail(props.email)
        if(userExist){
            return new SignUpError("User already exists!")
        }
        
        const newUserOrError = User.create(props)

        if(newUserOrError instanceof CreateUserError){
            return newUserOrError
        }
        await this.userRepository.save(newUserOrError)
    }
}

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