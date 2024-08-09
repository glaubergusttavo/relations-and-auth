import { LoginError } from "../../use-cases/errors/login";
import { LoginProps, LoginUseCase } from "../../use-cases/login";

export class LoginUserController {
    constructor(
        private readonly loginUseCase: LoginUseCase
    ) { }

    async handle(props: LoginProps) {

        const responseOrError = await this.loginUseCase.execute(props)

        if (responseOrError instanceof LoginError) {
            return {
                statusCode: 400,
                body: { message: responseOrError.message }
            }
        }
        return{
            statusCode: 200,
            body: responseOrError
        }

    }
}