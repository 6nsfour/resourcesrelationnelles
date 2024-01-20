import { User } from "@prisma/client";

export interface CreateUserDTO extends Omit<User, "id | role_id "> {
}

export interface UpdateUserDTO extends Partial<CreateUserDTO> {
    id: string;
}