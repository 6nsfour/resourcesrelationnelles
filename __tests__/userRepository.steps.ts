import 'jest';
import UserRepository from "../src/repository/UserRepository";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

test("Call add", async ()=> {
    let user = {
        firstname: "foo",
        lastname: "bar",
        email: "foo@gmail.com",
        password: "password",
    };
    await UserRepository.add(user);

    let userFound = await prisma.user.findFirst({where: {email: "foo@gmail.com"}});
    expect(userFound).not.toBe(null)
    // @ts-ignore
    expect(userFound.firstname).toBe('foo');
    // @ts-ignore
    expect(userFound.lastname).toBe('bar');
    // @ts-ignore
    expect(userFound.email).toBe('foo@gmail.com');
})

test("Call function", async ()=> {

})

