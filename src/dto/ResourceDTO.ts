import { Resource } from "@prisma/client";

export interface CreateResourceDTO extends Omit<Resource, "id | created_at | updated_at "> {
}

export interface UpdateResourceDTO extends Partial<CreateResourceDTO> {
    id: number;
}