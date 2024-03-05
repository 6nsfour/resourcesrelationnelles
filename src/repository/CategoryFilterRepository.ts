import { PrismaClient } from "@prisma/client";
import { CreateRelationCategoryDTO, UpdateRelationCategoryDTO } from "../dto/CategoryFilterDTO";

const prisma = new PrismaClient();

class CategoryFilterRepository {
    static async add(body: CreateRelationCategoryDTO): Promise<boolean> {
        try {
            await prisma.categoryFilter.create({
                data: {
                    resource_id: body.resource_id,
                    category_id: body.category_id,
                },
            });
            return true;
        } catch (error) {
            console.error("Error adding CategoryFilter:", error);
            return false;
        }
    }

    static async findAll(): Promise<any[]> {
        try {
            return await prisma.categoryFilter.findMany({
                include: {
                    resource: true,
                    category: true,
                },
            });
        } catch (error) {
            console.error("Error fetching CategoryFilters:", error);
            return [];
        }
    }

    static async delete(id: number): Promise<boolean> {
        try {
            await prisma.categoryFilter.delete({
                where: {
                    id: id,
                },
            });
            return true;
        } catch (error) {
            console.error("Error deleting CategoryFilter:", error);
            return false;
        }
    }

    static async findById(id: number): Promise<any | null> {
        try {
            return await prisma.categoryFilter.findUnique({
                where: {
                    id: id,
                },
                include: {
                    resource: true,
                    category: true,
                },
            });
        } catch (error) {
            console.error("Error finding CategoryFilter by ID:", error);
            return null;
        }
    }

    static async edit(id: number, body: UpdateRelationCategoryDTO): Promise<boolean> {
        try {
            await prisma.categoryFilter.update({
                where: { id },
                data: {
                    ...body,
                },
            });
            return true;
        } catch (error) {
            console.error("Error updating CategoryFilter:", error);
            return false;
        }
    }

}

export default CategoryFilterRepository;
