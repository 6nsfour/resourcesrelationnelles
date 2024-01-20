import { PrismaClient, User } from "@prisma/client";
import { CreateUserDTO, UpdateUserDTO } from "../dto/UserDTO";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

class UserRepository {
    static async findAll(): Promise<User[]> {
        return await prisma.user.findMany();
    }

    static async findById(id: string): Promise<User | null> {
        return await prisma.user.findUnique({ where: { id } });
    }

    static async add(body: CreateUserDTO): Promise<User | boolean>  {

        const existingRole = await prisma.role.findUnique({
            where: { id: body.role_id },
        });

        if(!existingRole) {
            return false;
        }

        const hashedPassword = await bcrypt.hash(body.password, 12);

        return await prisma.user.create({
            data: {
                firstname: body.firstname,
                lastname: body.lastname,
                email: body.email,
                password: hashedPassword,
                role: {
                    connect: { id: existingRole?.id },
                },
            },
        });
    }

    static async edit(id: string, updates: UpdateUserDTO): Promise<User | null> {
        return prisma.user.update({ where: { id }, data: updates });
    }

    static async delete(id: string) {
        return prisma.user.delete({where: {id} })
    }
}

export default UserRepository