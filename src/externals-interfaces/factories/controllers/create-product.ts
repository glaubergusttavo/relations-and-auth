import { CreateProductController } from "../../../infrastructure/controller/create-product";
import { CreateProductUseCase } from "../../../use-cases/create-product";
import { PrismaProductsRepository } from "../../repositories/prisma/products"
import { PrismaUsersRepository } from "../../repositories/prisma/users";

export const makeCreateProductController = () =>{
    const productsRepository = new PrismaProductsRepository();
    const usersRepository = new PrismaUsersRepository();
    const createProductUseCase = new CreateProductUseCase(productsRepository, usersRepository);
    return new CreateProductController(createProductUseCase);
}