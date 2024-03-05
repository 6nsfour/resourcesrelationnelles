import {PrismaClient, Status, Type} from "@prisma/client";
import {CreateTypeDTO, UpdateTypeDTO} from "../dto/TypeDTO";
import {UpdateStatusDTO} from "../dto/StatusDTO";
import StatusRepository from "./StatusRepository";

const prisma = new PrismaClient();

class TypeRepository{

    static async findAll(): Promise<Type[]>{
        return await prisma.type.findMany();
    }

    static async findById(id : number): Promise<Type | null>{
        return await prisma.type.findUnique({where : { id }});
    }

    static async findByValue(value : string): Promise<Type | null>{
        return await prisma.type.findFirst({where : { value }});
    }

    static async add(body: CreateTypeDTO): Promise<Type | boolean>{
        const existingType = await this.findByValue(body.value);

        if (existingType){
            console.log("type existe deja");
            return false;
        }
        else{
            return await prisma.type.create({
                data: body,
            });
        }
    }

    static async edit(id : number, UpdateTypeDTO: UpdateTypeDTO): Promise<Type>{
        return await prisma.type.update({
            where: { id },
            data: UpdateTypeDTO
        });
    }

    static async delete(id : number){
        try{
            await prisma.type.delete({ where : { id }});
        }catch (error){
            console.log("erreur lors de la suppression : ", error);
            return { error: 'internal Server Error' };
        }
    }
}

export default TypeRepository