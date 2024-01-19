import { PrismaClient, Resource } from '@prisma/client';
import { CreateResourcesDTO } from '../dto/ResourceDTO';

const prisma = new PrismaClient();

class ResourceRepository {
    static async findById(id: number): Promise<Resource | null> {
        return await prisma.resource.findUnique({ where: { id } });
    }

    static async create(body: CreateResourcesDTO): Promise<Resource> {

        const existingType = await prisma.type.findUnique({
            where: { id: body.type },
        });
        const existingUser = await prisma.user.findUnique({
            where: { id: body.user },
        });
        const existingStatus = await prisma.status.findUnique({
            where: { id: body.status },
        });
        const existingReach = await prisma.role.findUnique({
            where: { id: body.reach },
        });

        return prisma.resource.create({
            data: {
                content: body.content,
                title: body.title,
                type: {
                    connect: { id: existingType?.id},
                },
                status: {
                    connect: { id: existingStatus?.id }
                },
                reach: {
                    connect: { id: existingReach?.id}
                },
                user: {
                    connect: { id: existingUser?.id}
                }
            }
        });
    }

    static async update(id: number, updates: Partial<Resource>): Promise<Resource | null> {
        return prisma.resource.update({ where: { id }, data: updates });
    }

    static async delete(id: number): Promise<Resource | null> {
        return prisma.resource.delete({ where: { id } });
    }

    static async findAll(): Promise<Resource[]> {
        return prisma.resource.findMany();
    }
}

export default ResourceRepository
