export class CreateProductError extends Error {
    constructor(reason: string) {
        super(`Failed in create product: ${reason}`)
        this.name = 'CreateProductError'
    }
}