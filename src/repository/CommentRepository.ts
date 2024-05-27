import { PrismaClient, Comment, Type } from '@prisma/client';
import { CreateCommentDTO, UpdateCommentDTO } from '../dto/CommentDTO';

const prisma = new PrismaClient();

class CommentRepository {
  static async findAll(): Promise<Comment[]> {
    return await prisma.comment.findMany();
  }

  static async findById(id: number): Promise<Comment | null> {
    return await prisma.comment.findUnique({ where: { id } });
  }

  static async findByValue(content: string): Promise<Comment | null> {
    return await prisma.comment.findFirst({ where: { content } });
  }

  static async add(body: CreateCommentDTO): Promise<Comment | boolean> {
    const existingComment = await this.findByValue(body.content);

    if (existingComment) {
      console.log('comment existe deja');
      return false;
    } else {
      const now = new Date(); // Déclaration de now
      return prisma.comment.create({
        data: {
          ...body,
          created_at: now,
          updated_at: now,
        },
      });
    }
  }

  static async edit(
    id: number,
    UpdateCommentDTO: UpdateCommentDTO
  ): Promise<Comment> {
    return await prisma.comment.update({
      where: { id },
      data: UpdateCommentDTO,
    });
  }

  static async delete(id: number) {
    try {
      await prisma.comment.delete({ where: { id } });
    } catch (error) {
      console.log('erreur lors de la suppression : ', error);
      return { error: 'internal Server Error' };
    }
  }
}

export default CommentRepository;
