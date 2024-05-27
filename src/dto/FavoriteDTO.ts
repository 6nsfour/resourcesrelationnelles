import { Favorite } from '@prisma/client';
export interface CreateFavoriteDTO {
  user_id: string;
  resource_id: number;
}
