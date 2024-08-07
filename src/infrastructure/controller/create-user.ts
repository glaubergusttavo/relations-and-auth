import { CreateUserError } from "../../entities/errors/create-user";
import { CreateUserProps, CreateUserUseCase } from "../../use-cases/create-user";

export class CreateUserController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase
    ) { }

    async execute(props: CreateUserProps) {
        const createOrError = await this.createUserUseCase.execute(props);

        if (createOrError instanceof CreateUserError) {
            return {
                statusCode: 400,
                body: { message: createOrError.message }
            }
        }
        return {
            statusCode: 200,
            body: { message: "User created successfully!" }
        }
    }
}