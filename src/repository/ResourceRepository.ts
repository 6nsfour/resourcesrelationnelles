import { PrismaClient, Resource } from '@prisma/client';
import { CreateResourceDTO, UpdateResourceDTO } from '../dto/ResourceDTO';

const prisma = new PrismaClient();

class ResourceRepository {

    static async findAll(): Promise<Resource[]> {
        return prisma.resource.findMany({
            include: {
                resourceCategories: {
                    include: {
                        category: true
                    }
                },
                reach: true,
                status: true,
                resourceRelations: {
                    include: {
                        relation: true
                    }
                }
            }
        });
    }

    static async findById(id: number): Promise<Resource | null> {
        return prisma.resource.findUnique({ 
            where: { id },
            include: {
                resourceCategories: {
                    include: {
                        category: true
                    }
                },
                reach: true,
                status: true,
                resourceRelations: {
                    include: {
                        relation: true
                    }
                }
            }
        });
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
        }

        const now = new Date();

        return prisma.resource.create({
            data: {
                content: body.content,
                title: body.title,
                type: {
                    connect: { id: existingType?.id },
                },
                status: {
                    connect: { id: existingStatus?.id }
                },
                reach: {
                    connect: { id: existingReach?.id }
                },
                user: {
                    connect: { id: existingUser?.id }
                },
                resourceCategories: {
                    create: body.categories.map(categoryId => ({
                        category: {
                            connect: { id: categoryId }
                        }
                    }))
                },
                resourceRelations: {
                    create: body.relations.map(relationId => ({
                        relation: {
                            connect: { id: relationId }
                        }
                    }))
                },
                created_at: now,
                updated_at: now,
                file: null,
            }
        });
    }


    static async edit(id: number, updates: UpdateResourceDTO): Promise<Resource | null> {
        return prisma.resource.update({ where: { id }, data: {
            title: updates.title,
            content: updates.content,
            file: updates.file,
            status_id: updates.status_id,
            reach_id: updates.reach_id,
            type_id: updates.type_id,
            updated_at: new Date()
        } });
    }

    static async delete(id: number): Promise<Resource | null> {
        const resource = await prisma.resource.findUnique({
            where: { id },
            include: {
                resourceCategories: true,
                resourceRelations: true,
                Favorite: true,
            },
        });
    
        if (!resource) {
            return null;
        }
    
        await prisma.resourceCategory.deleteMany({
            where: {
                resource_id: id,
            },
        });

        await prisma.favorite.deleteMany({
            where: {
                resource_id: id,
            },
        });
    
        await prisma.resourceRelation.deleteMany({
            where: {
                resource_id: id,
            },
        });
    
        await prisma.resource.delete({
            where: { id },
        });
        return resource;
    }
}

export default ResourceRepository
