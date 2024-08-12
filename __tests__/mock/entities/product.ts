import { Product, ProductProps } from "../../../src/entities/products";

export const makeProduct = (override?: Partial<ProductProps>) =>{
   return Product.create({ 
    userId: "userId",
    type: "testType", 
    mark: "testMark",
    price: 10,
    ...override
   }) as Product
} 