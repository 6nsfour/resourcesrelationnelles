import {PrismaClient, Status} from "@prisma/client";
import {CreateStatusDTO, UpdateStatusDTO} from "../dto/StatusDTO";
import {CreateRoleDTO} from "../dto/RoleDTO";
import RoleRepository from "./RoleRepository";

const prisma = new PrismaClient();

class StatusRepository{
    static async findAll(): Promise<Status[]>{
        return await prisma.status.findMany();
    }

    static async findById(id: number): Promise<Status | null> {
        return await prisma.status.findUnique({ where: { id }});
    }

    static async findByValue(value: string): Promise<Status | null> {
        return await prisma.status.findFirst({ where: { value }});
    }

    static async add(body: CreateStatusDTO): Promise<Status| boolean> {
        const existingStatus = await this.findByValue(body.value);

        if (existingStatus){
            console.log("status existe deja");
            return false;
        }
        else{
            return await prisma.status.create({
                data: body,
            });
        }
    }

    static async edit(id: number, UpdateStatusDTO: UpdateStatusDTO): Promise<Status> {
        return await prisma.status.update({
            where: { id },
            data: UpdateStatusDTO
        });
    }
    static async delete(id: number){
        try{
            await prisma.status.deleteMany({ where: { id }});
        }catch(error){
            console.log("erreur lors de la suppression : ", error);
            return { error: 'internal Server Error' };
        }
    }
}



export default StatusRepository

