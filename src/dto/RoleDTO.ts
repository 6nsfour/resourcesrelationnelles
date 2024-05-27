import { Role } from '@prisma/client';

export interface CreateRoleDTO extends Omit<Role, 'id'> {
  value: string;
}

export interface UpdateRoleDTO extends Omit<Role, 'id'> {
  value: string;
}
