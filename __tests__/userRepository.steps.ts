import {Given, Then, When} from "@cucumber/cucumber";
import 'ts-jest' ;
import UserRepository from "../src/repository/UserRepository";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();
Given(/^a empty database$/, function () {

});
When(/^I call the add function with required parameters$/, async function () {
    let user  = {
        firstname: "foo",
        lastname: "bar",
        email: "foo@gmail.com",
        password: "password",
    };
    await UserRepository.add(user);
});
Then(/^It should exist a new user defined by the parameters sent$/, async function () {
    let userFound = await prisma.user.findFirst({where: {email: "foo@gmail.com"}});
    expect(userFound).not.toBe(null)
    // @ts-ignore
    expect(userFound.firstname).toBe('foo');
    // @ts-ignore
    expect(userFound.lastname).toBe('bar');
    // @ts-ignore
    expect(userFound.email).toBe('foo@gmail.com');
});
