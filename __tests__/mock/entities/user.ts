import { User, UserProps } from "../../../src/entities/users";

export const makeUser = (override?: Partial<UserProps>) => {
    return User.create({
        name: "testName",
        email: "test@gmail.com",
        password: "pass123",
        ...override
    }) as User
}