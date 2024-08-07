import { Product } from "../../src/entities/products";
import { ProductsRepository } from "../../src/use-cases/interfaces/products-repository";

export class InMemoryProductsRepository implements ProductsRepository{
    
    public products: Product[] = [];
    
    async save(product: Product){
        this.products.push(product)
    }
    
    async getAll(){
        return this.products;
    }

    async findById(id: string){
        return this.products.find(product => product.getId === id) 
    }

    async update(product: Product) {
     const index = this.products.findIndex(product => product.getId == product.getId)
     this.products[index] = product
    }
}