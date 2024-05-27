import { Category } from '@prisma/client';

export interface CreateCategoryDTO extends Omit<Category, 'id'> {
  value: string;
}

export interface UpdateCategoryDTO extends Omit<Category, 'id'> {
  value: string;
}
