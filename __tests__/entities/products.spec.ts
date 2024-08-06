import {describe, it, expect} from "vitest"

export interface ProductProps{
    id?: string
    type: string
    mark: string
    price: number
}

export class Product{
     private id: string 
     private type: string
     private mark: string
     private price: number
     
     get getId(){
        return this.id
     }

     get getType(){
        return this.type
     }

     get getMark(){
        return this.mark
     }

     get getPrice(){
        return this.price
     }

     private constructor(props: ProductProps){
        this.id = props.id || crypto.randomUUID();
        this.type = props.type
        this.mark = props.mark
        this.price = props.price
     }

     static create(props: ProductProps){
        return new Product(props)
     }
}

describe("Product", () => {
    describe("createProduct", () => {
        it("should be able to create product without passing ID", () => {
            const product = Product.create({
                type: "test",
                mark: "testMark",
                price: 9.99
            })
            
            expect((product as Product).getId).toBeTruthy();
        })
    })
})