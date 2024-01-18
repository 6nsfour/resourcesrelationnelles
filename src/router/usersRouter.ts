import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();
const usersRouter = express.Router();

usersRouter.get('/', async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default usersRouter;
