import { CreateProductError } from "../entities/errors/create-product";
import { Product } from "../entities/products";
import { ProductsRepository } from "./interfaces/products-repository";

export interface CreateProductProps {
    type: string
    mark: string
    price: number
}

export class CreateProductUseCase {
    constructor(
        private readonly productsRepository: ProductsRepository
    ) {}

    async execute(props: CreateProductProps) {

        const createOrError = Product.create(props)

        if (createOrError instanceof CreateProductError) {
            return createOrError;
        }
        await this.productsRepository.save(createOrError)
    }
}