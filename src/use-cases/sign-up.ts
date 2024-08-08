import { CreateUserError } from "../entities/errors/create-user"
import { User } from "../entities/users"
import { SignUpError } from "./errors/sign-up"
import { UsersRepository } from "./interfaces/users-repository"

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