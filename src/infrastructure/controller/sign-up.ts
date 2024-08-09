import { SignUpError } from "../../use-cases/errors/sign-up";
import { SignUpUseCase, SingUpProps } from "../../use-cases/sign-up";

export class SignUpController{
    constructor(
        private readonly signUpUseCase: SignUpUseCase
    ){}

    async handle(props: SingUpProps){
        const responseOrError = await this.signUpUseCase.execute(props)

        if(responseOrError instanceof SignUpError){
            return{
                statusCode: 400,
                body: {message: responseOrError.message}
            }
        }
        return {
            statusCode: 200,
            body: {message: "User created successfully!"}
        }
    }
}