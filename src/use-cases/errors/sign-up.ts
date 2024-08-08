export class SignUpError extends Error{
    constructor(reason: string){
        super(`Failed in signUp user: ${reason}`)
        this.name = 'SignUpError'
    }
}