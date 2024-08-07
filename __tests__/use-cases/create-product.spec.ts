import { describe, it, expect } from "vitest"

import { InMemoryProductsRepository } from "../repositories/in-memory-products"
import { CreateProductUseCase } from "../../src/use-cases/create-product"

describe("CreateProductUseCase", () => {
    describe("createProduct", () => {
        it("should be able to create product", async () => {
            const productsRepository = new InMemoryProductsRepository();
            const useCase = new CreateProductUseCase(productsRepository);

            await useCase.execute({
                type: "typeTest",
                mark: "typeMark",
                price: 9.99
            })

            expect(productsRepository.products).toHaveLength(1)
        })
    })
})