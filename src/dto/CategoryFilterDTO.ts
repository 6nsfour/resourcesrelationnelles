export interface CreateRelationCategoryDTO {
    resource_id: number;
    category_id: number;
}

export interface UpdateRelationCategoryDTO {
    resource_id?: number;
    category_id?: number;
}
