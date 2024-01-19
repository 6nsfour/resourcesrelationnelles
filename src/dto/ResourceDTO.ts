export interface CreateResourcesDTO {
    content: string;
    title: string;
    status: number;
    user: string;
    reach: number;
    type: number;
    file?: Blob;
}