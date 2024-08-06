import { CreateUserError } from "./errors/create-user"

export interface UserProps {
    id?: string
    name: string
    email: string
    password: string
}

export class User {
    private id: string
    private name: string
    private email: string
    private password: string

    get getId() {
        return this.id
    }

    get getName() {
        return this.name
    }

    get getEmail() {
        return this.email
    }

    get getPassword() {
        return this.password
    }

    private constructor(props: UserProps) {
        this.id = props.id || crypto.randomUUID()
        this.name = props.name
        this.email = props.email
        this.password = props.password
    }

    public updateEmail(props: { email: string }) {
        if (props.email == this.email) {
            return new CreateUserError("Email already exists!")
        }
        this.email = props.email
    }

    static create(props: UserProps): CreateUserError | User {
        if (props.name.length > 20) {
            return new CreateUserError("Name is greater that 20 character!")
        }
        return new User(props);
    }

}