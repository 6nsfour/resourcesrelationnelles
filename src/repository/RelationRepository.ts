import {PrismaClient, Relation} from "@prisma/client";
import {CreateRelationDTO, UpdateRelationDTO} from "../dto/RelationDTO";


const prisma = new PrismaClient();

class RelationRepository{

    static async findAll(): Promise<Relation[]>{
        return await prisma.relation.findMany();
    }

    static async findById(id : number):Promise<Relation | null>{
        return await prisma.relation.findUnique({where : { id }});
    }

    static async findByValue(value : string):Promise<Relation | null>{
        return await prisma.relation.findFirst({where: {value}});
    }

    static async add(body: CreateRelationDTO): Promise<Relation | boolean>{
        const existingRelation = await this.findByValue(body.value);

        if (existingRelation){
            console.log("relation existe deja");
            return false;
        }
        else{
            return await prisma.relation.create({
                data: body,
            });
        }
    }

    static async edit(id : number, UpdateRelationDTO: UpdateRelationDTO): Promise<Relation>{
        return await prisma.relation.update({
            where: { id },
            data: UpdateRelationDTO
        });
    }

    static async delete(id : number){
        try{
            await prisma.relation.delete({ where : { id }});
        }catch (error){
            console.log("erreur lors de la suppression : ", error);
            return { error: 'internal Server Error' };
        }
    }
}

export default RelationRepository