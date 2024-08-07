export class CreateUserError extends Error {
    constructor(reason: string) {
        super(`Failed in create user: ${reason}`);
        this.name = 'CreateUserError';
    }
}
