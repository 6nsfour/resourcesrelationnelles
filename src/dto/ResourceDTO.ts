import { Resource } from "@prisma/client";

export interface CreateResourceDTO extends Omit<Resource, "id" | "created_at" | "updated_at"> {
    categories: number[],
    relations: number[],
}

//#TODO Verifier quelle champ sera modifiable ou non quand on update, cf. cahier des charges.
export interface UpdateResourceDTO extends Omit<Partial<CreateResourceDTO>, "reach_id" | "status_id" | "user_id" | "type_id"> {
}