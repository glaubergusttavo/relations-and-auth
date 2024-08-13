import { describe, it, expect } from "vitest"

import { InMemoryProductsRepository } from "../repositories/in-memory-products"
import { CreateProductUseCase } from "../../src/use-cases/create-product"
import { InMemoryUsersRepository } from "../repositories/in-memory-users"
import { CreateProductError } from "../../src/entities/errors/create-product"
import { makeUser } from "../mock/entities/user"
import { makeProduct } from "../mock/entities/product"

describe("CreateProductUseCase", () => {
    describe("createProduct", () => {
        it("should not be able to create product with invalid userID", async () => {
            const productsRepository = new InMemoryProductsRepository();
            const usersRepository = new InMemoryUsersRepository();
            const createProductUseCase = new CreateProductUseCase(productsRepository, usersRepository)
            const user = makeUser()
            usersRepository.save(user)

            const createOrError = await createProductUseCase.execute({
                userId: "wrongUserId",
                type: "testType",
                mark: "testMark",
                price: 10
            })

            expect(createOrError).toBeInstanceOf(CreateProductError)
            expect(createOrError as CreateProductError).toEqual(new CreateProductError("ID invalid -> User does not exists!"))
        })
        it("should be able to create product with valid userID", async () => {
            const productsRepository = new InMemoryProductsRepository();
            const usersRepository = new InMemoryUsersRepository();
            const createProductUseCase = new CreateProductUseCase(productsRepository, usersRepository);

            const user = makeUser();
            usersRepository.save(user)

            await createProductUseCase.execute({
                userId: user.getId,
                type: "typeTest",
                mark: "typeMark",
                price: 9.99
            })
            expect(productsRepository.products).toHaveLength(1)
        })
        it("should not be able to create product with UserID, type and mark that the same declared", async () => {
            const productsRepository = new InMemoryProductsRepository();
            const usersRepository = new InMemoryUsersRepository();
            const createProductUseCase = new CreateProductUseCase(productsRepository, usersRepository);
            
            const user = makeUser();
            usersRepository.save(user)

            const product = makeProduct({userId: user.getId});
            productsRepository.save(product)

            const createError = await createProductUseCase.execute({
                userId: product.getUserId,
                type: product.getType,
                mark: product.getMark,
                price: 9.99
            })
            expect(createError).toBeInstanceOf(CreateProductError)
            expect(createError as CreateProductError).toEqual(new CreateProductError("Product already exists!"))
        })
    })
})
