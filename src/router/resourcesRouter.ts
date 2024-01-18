import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

interface CreateResourceDTO {
    content: string;
    title: string;
    status: number;
    user: string;
    reach: number;
    type: number;
    file?: Blob;
}

const prisma = new PrismaClient();
const resourcesRouter = express.Router();

resourcesRouter.get('/', async (req: Request, res: Response) => {
    try {
        const resources = await prisma.resource.findMany();
        res.json(resources);
    } catch(error) {
        console.error('error fetching all users', error);
    }
});

resourcesRouter.get('/:id', async (req: Request, res: Response) => {
    try{
        const id = +req.params.id;
        const resource = await prisma.resource.findUnique({
            where: {id: id}
        })
        res.json(resource);
    } catch (error) {
        console.error(error);
        
    }
})

resourcesRouter.post('/', async (req: Request, res: Response) => {
    const body: CreateResourceDTO = req.body;

    try{        
        const existingType = await prisma.type.findUnique({
            where: { id: body.type },
        });
        const existingUser = await prisma.user.findUnique({
            where: { id: body.user },
        });
        const existingStatus = await prisma.status.findUnique({
            where: { id: body.status },
        });
        const existingReach = await prisma.role.findUnique({
            where: { id: body.reach },
        });


        await prisma.resource.create({
            data: {
                content: body.content,
                title: body.title,
                type: {
                    connect: { id: existingType?.id},
                },
                status: {
                    connect: { id: existingStatus?.id }
                },
                reach: {
                    connect: { id: existingReach?.id}
                },
                user: {
                    connect: { id: existingUser?.id}
                }
            }
        });
        res.status(201).json({ message: 'Resource successfully created' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// resourcesRouter.patch();

// resourcesRouter.delete();

export default resourcesRouter;

