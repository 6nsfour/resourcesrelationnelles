import { Type } from '@prisma/client';

export interface CreateTypeDTO extends Omit<Type, 'id'> {
  value: string;
}

export interface UpdateTypeDTO extends Omit<Type, 'id'> {
  value: string;
}
