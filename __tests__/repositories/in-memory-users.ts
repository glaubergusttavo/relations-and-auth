import { User } from "../../src/entities/users";
import { UsersRepository } from "../../src/use-cases/interfaces/users-repository";

export class InMemoryUsersRepository implements UsersRepository{
    
    public users: User[] = [];
    
    async save(user: User){
        this.users.push(user)
    }
    
    async getAll(){
        return this.users;
    }

    async findById(id: string){
        return this.users.find(user => user.getId === id) 
    }

    async update(user: User) {
     const index = this.users.findIndex(user => user.getId == user.getId)
     this.users[index] = user;
    }
}