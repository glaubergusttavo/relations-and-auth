import { User } from "../../entities/users"

export interface UsersRepository{
    save(user: User): Promise<void>
    getAll(): Promise<User[]>
    findById(id: string): Promise<User | undefined>
    update(user: User): Promise<void>
}