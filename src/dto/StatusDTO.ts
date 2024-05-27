import { Status } from '@prisma/client';

export interface CreateStatusDTO extends Omit<Status, 'id'> {
  value: string;
}

export interface UpdateStatusDTO extends Omit<Status, 'id'> {
  value: string;
}
