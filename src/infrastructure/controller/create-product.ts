import { CreateProductError } from "../../entities/errors/create-product";
import { CreateProductProps, CreateProductUseCase } from "../../use-cases/create-product";

export class CreateProductController {
    constructor(
        private readonly createProductUseCase: CreateProductUseCase
    ) { }

    async execute(props: CreateProductProps) {
        const createOrError = await this.createProductUseCase.execute(props)

        if (createOrError instanceof CreateProductError) {
            return {
                statusCode: 400,
                body: { message: createOrError.message }
            }
        }
        return {
            statusCode: 200,
            body: { message: "Product created successfully!" }
        }

    }
}