import {Reach} from "@prisma/client";

export interface CreateReachDTO extends Omit<Reach, "id">{
    value: string;
}

export interface UpdateReachDTO extends Omit<Reach, "id">{
    value: string;
}