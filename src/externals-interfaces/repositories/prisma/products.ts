import { Product } from "../../../entities/products";
import { ProductsRepository } from "../../../use-cases/interfaces/products-repository";
import { prisma } from "../../prisma";

export class PrismaProductsRepository implements ProductsRepository {
    async save(product: Product) {
        await prisma.product.create({
            data: {
                user_id: product.getUserId,
                id: product.getId,
                type: product.getType,
                mark: product.getMark,
                price: product.getPrice
            }
        })
    }
    async getAll() {
        const dbProducts = await prisma.product.findMany()

        return dbProducts.map(product => {
            return Product.create({
                userId: product.user_id,
                id: product.id,
                type: product.type,
                mark: product.mark,
                price: product.price
            }) as Product
        })
    }

    async findById(id: string) {
        const productId = await prisma.product.findFirst({
            where: { id: id }
        })
        if (productId) {
            return Product.create({
                userId: productId.user_id,
                id: productId.id,
                type: productId.type,
                mark: productId.mark,
                price: productId.price
            }) as Product
        }
        return undefined;

    }
    async update(product: Product) {
        prisma.product.update({
            where: { id: product.getId },
            data: {
                price: product.getPrice
            }
        })
    }

} 