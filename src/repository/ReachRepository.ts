import {PrismaClient, Reach} from "@prisma/client";
import {CreateReachDTO, UpdateReachDTO} from "../dto/ReachDTO";

const prisma = new PrismaClient();

class ReachRepository{
    static async findAll(): Promise<Reach[]>{
        return await prisma.reach.findMany();
    }

    static async findById(id: number): Promise<Reach | null> {
        return await prisma.reach.findUnique({ where: { id }});
    }

    static async findByValue(value: string): Promise<Reach | null> {
        return await prisma.reach.findFirst({ where: { value }});
    }

    static async add(body: CreateReachDTO): Promise<Reach| boolean> {
        const existingReach = await this.findByValue(body.value);

        if (existingReach){
            console.log("reach existe deja");
            return false;
        }
        else{
            return await prisma.reach.create({
                data: body,
            });
        }
    }
    static async edit(id: number, UpdateReachDTO: UpdateReachDTO): Promise<Reach> {
        return await prisma.reach.update({
            where: { id },
            data: UpdateReachDTO
        });
    }
    static async delete(id: number){
        try{
            await prisma.reach.deleteMany({ where: { id }});
        }catch(error){
            console.log("erreur lors de la suppression : ", error);
            return { error: 'internal Server Error' };
        }
    }
}

export default ReachRepository