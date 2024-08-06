import { describe, it, expect } from "vitest"
import { CreateUserError } from "../../src/entities/errors/create-user"
import { User } from "../../src/entities/users"

describe("User", () => {
    describe("createUser", () => {
        it("should be able to create user without passing ID", () => {
            const user = User.create({
                name: "test",
                email: "test@gmail.com",
                password: "12345"
            })

            expect((user as User).getId).toBeTruthy();
        })
        it("should be able to create user passing ID", () => {
            const user = User.create({
                id: "id-test",
                name: "test",
                email: "test@gmail.com",
                password: "12345"
            })

            expect((user as User).getId).toBe("id-test");
        })
        it("should not be able to create user with name lenght greater that 20 characters", () => {
            const userOrError = User.create({
                name: "testlllllllllllllllll",
                email: "test@gmail.com",
                password: "12345"
            })

            expect((userOrError as CreateUserError)).toBeInstanceOf(CreateUserError)
        })
    })

    describe("updateEmail", () => {
        it("should not be able to update email if value is the same declared", () => {
            const user = User.create({
                name: "test",
                email: "test@gmail.com",
                password: "12345"
            })
            const updateOrError = (user as User).updateEmail({ email: "test@gmail.com" })

            expect(updateOrError).toBeInstanceOf(CreateUserError)
            expect((updateOrError as CreateUserError).message).toEqual("Failed in create user: Email already exists!")
        })
        it("should be able to update email", () => {
            const user = User.create({
                name: "test",
                email: "test@gmail.com",
                password: "12345"
            });
            (user as User).updateEmail({ email: "testeUpdate@gmail.com" })

            expect((user as User).getEmail).toBe("testeUpdate@gmail.com")
        })
    })

})