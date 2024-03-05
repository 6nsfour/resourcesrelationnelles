import { PrismaClient } from "@prisma/client";
import { CreateToCommentDTO } from "../dto/ToCommentDTO";

const prisma = new PrismaClient();

class ToCommentRepository {
    static async add(body: CreateToCommentDTO): Promise<boolean> {
        try {
            await prisma.toComment.create({
                data: {
                    user_id: body.user_id,
                    resource_id: body.resource_id,
                    comment_id: body.comment_id,
                },
            });
            return true;
        } catch (error) {
            console.error("Error adding toComment:", error);
            return false;
        }
    }

    static async findById(toCommentId: number): Promise<any | null> {
        try {
            const toComment = await prisma.toComment.findUnique({
                where: {
                    id: toCommentId,
                },
                include: {
                    resource: true,
                    comment: true,
                    user: true,
                },
            });
            return toComment;
        } catch (error) {
            console.error("Error finding toComment by id:", error);
            return null;
        }
    }

    static async findAll(): Promise<any[]> {
        try {
            return await prisma.toComment.findMany({
                include: {
                    resource: true,
                    comment: true,
                    user: true,
                },
            });
        } catch (error) {
            console.error("Error fetching toComments:", error);
            return [];
        }
    }

    static async delete(toCommentId: number): Promise<boolean> {
        try {
            await prisma.toComment.delete({
                where: {
                    id: toCommentId,
                },
            });
            return true;
        } catch (error) {
            console.error("Error deleting toComment:", error);
            return false;
        }
    }
}

export default ToCommentRepository;
