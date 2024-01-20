import { PrismaClient, Resource } from '@prisma/client';
import { CreateResourceDTO, UpdateResourceDTO } from '../dto/ResourceDTO';

const prisma = new PrismaClient();

class ResourceRepository {

    static async findAll(): Promise<Resource[]> {
        return prisma.resource.findMany();
    }

    static async findById(id: number): Promise<Resource | null> {
        return await prisma.resource.findUnique({ where: { id } });
    }

    static async add(body: CreateResourceDTO): Promise<Resource | { error: string, errors: string[] }> {

        const errors: string[] = [];

        const existingType = await prisma.type.findUnique({
            where: { id: body.type_id },
        });
        const existingUser = await prisma.user.findUnique({
            where: { id: body.user_id },
        });
        const existingStatus = await prisma.status.findUnique({
            where: { id: body.status_id },
        });
        const existingReach = await prisma.role.findUnique({
            where: { id: body.reach_id },
        });

        if (!existingReach) {
            errors.push('reach');
        }
        if (!existingStatus) {
            errors.push('status');
        }
        if (!existingType) {
            errors.push('type');
        }
        if (!existingUser) {
            errors.push('user');
        }

        if (errors.length > 0) {
            return { error: 'Some values are missing', errors };
        };

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

    static async edit(id: number, updates: UpdateResourceDTO): Promise<Resource | null> {
        return prisma.resource.update({ where: { id }, data: updates });
    }

    static async delete(id: number): Promise<Resource | null> {
        return prisma.resource.delete({ where: { id } });
    }

}

export default ResourceRepository
