import { Favorite, PrismaClient } from '@prisma/client';
import { CreateFavoriteDTO } from '../dto/FavoriteDTO';

const prisma = new PrismaClient();

class FavoriteRepository {
  static async add(body: CreateFavoriteDTO): Promise<boolean> {
    try {
      await prisma.favorite.create({
        data: {
          user_id: body.user_id,
          resource_id: body.resource_id,
        },
      });
      return true;
    } catch (error) {
      console.error('Error adding favorite:', error);
      return false;
    }
  }

  static async findByUserIdAndResourceId(
    userId: string,
    resourceId: number
  ): Promise<Favorite | null> {
    try {
      const favorite = await prisma.favorite.findFirst({
        where: {
          user_id: userId,
          resource_id: resourceId,
        },
      });
      return favorite;
    } catch (error) {
      console.error('Error finding favorite by userId and resourceId:', error);
      return null;
    }
  }

  static async findAll(): Promise<any[]> {
    try {
      return await prisma.favorite.findMany({
        include: {
          resource: true,
        },
      });
    } catch (error) {
      console.error('Error fetching favorites for user:', error);
      return [];
    }
  }

  //static async findById():
  static async delete(userId: string, resourceId: number): Promise<boolean> {
    try {
      await prisma.favorite.deleteMany({
        where: {
          user_id: userId,
          resource_id: resourceId,
        },
      });
      return true;
    } catch (error) {
      console.error('Error deleting favorite:', error);
      return false;
    }
  }
}

export default FavoriteRepository;
