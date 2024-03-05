import {Comment} from "@prisma/client";

export interface CreateCommentDTO extends Omit<Comment, "id" | "created_at" | "updated_at">{
    content: string;
}

export interface UpdateCommentDTO extends Omit<Comment, "id">{
    content: string;
}