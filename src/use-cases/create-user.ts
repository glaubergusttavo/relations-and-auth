import { CreateUserError } from "../entities/errors/create-user"
import { User } from "../entities/users"
import { UsersRepository } from "./interfaces/users-repository"

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