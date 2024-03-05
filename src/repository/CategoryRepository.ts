import {PrismaClient, Category, Type} from "@prisma/client";
import {CreateCategoryDTO, UpdateCategoryDTO} from "../dto/CategoryDTO";


const prisma = new PrismaClient();

class CategoryRepository{

    static async findAll(): Promise<Category[]>{
        return await prisma.category.findMany();
    }

    static async findById(id : number):Promise<Category | null>{
        return await prisma.category.findUnique({where : { id }});
    }

    static async findByValue(value : string):Promise<Category | null>{
        return await prisma.category.findFirst({where: {value}});
    }

    static async add(body: CreateCategoryDTO): Promise<Category | boolean>{
        const existingCategory = await this.findByValue(body.value);

        if (existingCategory){
            console.log("category existe deja");
            return false;
        }
        else{
            return await prisma.category.create({
                data: body,
            });
        }
    }

    static async edit(id : number, UpdateCategoryDTO: UpdateCategoryDTO): Promise<Category>{
        return await prisma.category.update({
            where: { id },
            data: UpdateCategoryDTO
        });
    }

    static async delete(id : number){
        try{
            await prisma.category.delete({ where : { id }});
        }catch (error){
            console.log("erreur lors de la suppression : ", error);
            return { error: 'internal Server Error' };
        }
    }
}

export default CategoryRepository