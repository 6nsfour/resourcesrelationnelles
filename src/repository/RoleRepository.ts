import { PrismaClient, Role } from '@prisma/client';
import { CreateRoleDTO, UpdateRoleDTO } from '../dto/RoleDTO';
import { promises } from 'node:dns';
import UserRepository from './UserRepository';

const prisma = new PrismaClient();

class RoleRepository {
  static async findAll(): Promise<Role[]> {
    return await prisma.role.findMany();
  }

  static async findById(id: number): Promise<Role | null> {
    return await prisma.role.findUnique({ where: { id } });
  }

  static async findByValue(value: string): Promise<Role | null> {
    return await prisma.role.findFirst({ where: { value } });
  }

  static async add(body: CreateRoleDTO): Promise<Role | boolean> {
    const existingRole = await this.findByValue(body.value);

    if (existingRole) {
      console.log('role existe deja');
      return false;
    } else {
      return await prisma.role.create({
        data: body,
      });
    }
  }

  static async edit(id: number, UpdateRoleDTO: UpdateRoleDTO): Promise<Role> {
    return await prisma.role.update({
      where: { id },
      data: UpdateRoleDTO,
    });
  }

  static async delete(id: number) {
    try {
      await prisma.role.deleteMany({ where: { id } });
    } catch (error) {
      console.log('erreur lors de la suppression : ', error);
      return { error: 'internal Server Error' };
    }
  }
}

export default RoleRepository;
