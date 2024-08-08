export class LoginError extends Error{
    constructor(reason: string){
        super(`Failed in login user: ${reason}`)
        this.name = 'LoginError'
    }
}