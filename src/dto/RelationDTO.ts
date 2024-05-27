import { Relation } from '@prisma/client';

export interface CreateRelationDTO extends Omit<Relation, 'id'> {
  value: string;
}

export interface UpdateRelationDTO extends Omit<Relation, 'id'> {
  value: string;
}
