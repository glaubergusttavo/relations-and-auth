import { describe, it, expect } from "vitest"

import { CreateProductError } from "../../src/entities/errors/create-product"
import { Product } from "../../src/entities/products"

describe("Product", () => {
   describe("createProduct", () => {

      it("should be able to create product without passing ID product", () => {
         const product = Product.create({
            userId: "userId",
            type: "test",
            mark: "testMark",
            price: 9.99
         })

         expect((product as Product).getId).toBeTruthy();
      })

      it("should be able to create product passing ID", () => {
         const product = Product.create({
            id: "testeId",
            userId: "userId",
            type: "test",
            mark: "testMark",
            price: 9.99
         })

         expect((product as Product).getId).toBe("testeId")
      })

      it("should not be able to create product with type lenght greater that 15 characters", () => {
         const product = Product.create({
            userId: "userId",
            type: "testllllllllllll",
            mark: "testMark",
            price: 9.99
         })

         expect(product as CreateProductError).toBeInstanceOf(CreateProductError)
      })
   })

   describe("updatePrice", () => {
      it("should not be able to update value price if value is the same declared", () => {
         const product = Product.create({
            userId: "userId",
            type: "test",
            mark: "testMark",
            price: 10
         })
         const updateOrError = (product as Product).updatePrice({ price: 10 })

         expect(updateOrError).toBeInstanceOf(CreateProductError)
         expect((updateOrError as CreateProductError).message).toEqual("Failed in create product: Price is the same declared!")
      })

      it("should not be able to update price if value is greater that 5.000", () => {
         const product = Product.create({
            userId: "userId",
            type: "test",
            mark: "testMark",
            price: 10
         });
         const updateOrError = (product as Product).updatePrice({ price: 10000 })

         expect(updateOrError).toBeInstanceOf(CreateProductError)
         expect((updateOrError as CreateProductError).message).toEqual("Failed in create product: Price is the greater that $5000!")
      })
      
      it("should be able to update price", () =>{
         const product = Product.create({
            userId: "userId",
            type: "test",
            mark: "testMark",
            price: 10
         });
         (product as Product).updatePrice({ price: 30 })

         expect((product as Product).getPrice).toBe(30)
      })
   })
})