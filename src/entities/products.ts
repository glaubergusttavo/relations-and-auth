import { CreateProductError } from "./errors/create-product"

export interface ProductProps {
    id?: string
    type: string
    mark: string
    price: number
 }
 
 export class Product {
    private id: string
    private type: string
    private mark: string
    private price: number
 
    get getId() {
       return this.id
    }
 
    get getType() {
       return this.type
    }
 
    get getMark() {
       return this.mark
    }
 
    get getPrice() {
       return this.price
    }
 
    private constructor(props: ProductProps) {
       this.id = props.id || crypto.randomUUID();
       this.type = props.type
       this.mark = props.mark
       this.price = props.price
    }
 
    static create(props: ProductProps): CreateProductError | Product {
       if (props.type.length > 15) {
          return new CreateProductError("Type is greater that 15 characters!")
       }
       return new Product(props)
    }
 
    public updatePrice(props: { price: number }) {
       if (this.price === props.price) {
          return new CreateProductError("Price is the same declared!")
       }
       if (props.price > 5000) {
          return new CreateProductError("Price is the greater that $5000!")
       }
       this.price = props.price
    }
 }