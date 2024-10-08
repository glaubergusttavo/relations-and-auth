import { Product } from "../../entities/products";

export interface ProductsRepository{
    save(product: Product): Promise<void>
    getAll(): Promise<Product[]>
    findByMark(mark: string): Promise<Product[]>
    findById(id: string): Promise<Product | undefined>
    update(product: Product): Promise<void>
}