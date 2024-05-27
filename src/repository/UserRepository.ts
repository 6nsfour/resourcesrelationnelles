import { PrismaClient, User } from '@prisma/client';
import { CreateUserDTO, UpdateUserDTO } from '../dto/UserDTO';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

class UserRepository {
  static async findAll(): Promise<User[]> {
    return await prisma.user.findMany();
  }

  static async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { id } });
  }

  static async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findFirst({ where: { email } });
  }

  static async add(body: CreateUserDTO): Promise<User | boolean | string> {
    const existingRole = await prisma.role.findUnique({
      where: { id: 1 },
    });

    if (await UserRepository.findByEmail(body.email)) {
      return 'email_error';
    }

    if (!existingRole) {
      return 'role_error';
    }

    const hashedPassword = await bcrypt.hash(body.password, 12);

    return await prisma.user.create({
      data: {
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email,
        password: hashedPassword,
        role: {
          connect: { id: 1 },
        },
      },
    });
  }

  //#TODO A Revoir
  //#TODO nom prenom (accessible que pour l'user)
  //#TODO Faire une pour le mdp et une pour l'email.
  static async edit(id: string, updates: UpdateUserDTO): Promise<User | null> {
    return prisma.user.update({
      where: { id },
      data: {
        firstname: updates.firstname,
        lastname: updates.lastname,
      },
    });
  }

  static async delete(id: string) {
    try {
      await prisma.resource.deleteMany({
        where: { user_id: id },
      });

      await prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      console.error('error deleting user:', error);
      return { error: 'internal Server Error' };
    }
  }
}

export default UserRepository;
