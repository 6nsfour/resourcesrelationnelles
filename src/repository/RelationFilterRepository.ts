import { PrismaClient } from "@prisma/client";
import {CreateRelationFilterDTO, UpdateRelationFilterDTO} from "../dto/RelationFilterDTO";

const prisma = new PrismaClient();

class RelationFilterRepository {
    static async add(body: CreateRelationFilterDTO): Promise<boolean> {
        try {
            await prisma.relationFilter.create({
                data: body,
            });
            return true;
        } catch (error) {
            console.error("Error adding RelationFilter:", error);
            return false;
        }
    }

    static async findAll(): Promise<any[]> {
        try {
            return await prisma.relationFilter.findMany({
                include: {
                    relation: true,
                    resource: true,
                },
            });
        } catch (error) {
            console.error("Error fetching RelationFilters:", error);
            return [];
        }
    }

    static async findById(id: number): Promise<any | null> {
        try {
            const relationFilter = await prisma.relationFilter.findUnique({
                where: { id },
                include: {
                    relation: true,
                    resource: true,
                },
            });
            return relationFilter;
        } catch (error) {
            console.error("Error finding RelationFilter by ID:", error);
            return null;
        }
    }

    static async edit(id: number, body: UpdateRelationFilterDTO): Promise<boolean> {
        try {
            await prisma.relationFilter.update({
                where: { id },
                data: body,
            });
            return true;
        } catch (error) {
            console.error("Error updating RelationFilter:", error);
            return false;
        }
    }
    static async delete(id: number): Promise<boolean> {
        try {
            await prisma.relationFilter.delete({
                where: { id },
            });
            return true;
        } catch (error) {
            console.error("Error deleting RelationFilter:", error);
            return false;
        }
    }
}

export default RelationFilterRepository;
