import { CreateProductError } from "../entities/errors/create-product";
import { Product } from "../entities/products";
import { ProductsRepository } from "./interfaces/products-repository";
import { UsersRepository } from "./interfaces/users-repository";

export interface CreateProductProps {
    userId: string
    type: string
    mark: string
    price: number
}

export class CreateProductUseCase {
    constructor(
        private readonly productsRepository: ProductsRepository,
        private readonly usersRepository: UsersRepository
    ) { }

    async execute(props: CreateProductProps) {
        
        const userExist = await this.usersRepository.findById(props.userId)

        if (!userExist) {
            return new CreateProductError("ID invalid -> User does not exists!")
        }
        const createOrError = Product.create(props)

        if (createOrError instanceof CreateProductError) {
            return createOrError;
        }
        await this.productsRepository.save(createOrError);
    }
}