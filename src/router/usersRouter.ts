import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';


const prisma = new PrismaClient();
const usersRouter = express.Router();
const saltRounds = 12;

interface CreateUserRequest {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: number;
}

usersRouter.get('/', async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

usersRouter.get('/:id', async (req: Request, res: Response)=> {
    const id = (req.params.id.trim());
    if(!id){
        return res.status(400).json({ error: 'Invalid user id' });
    }

    try{
        const users = await prisma.user.findUnique({where: { id },});
        if (users) {
            res.json(users);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

usersRouter.post('/', async (req: Request, res: Response) => {
    const body: CreateUserRequest = req.body;

    try {
        let roleId;
        if (body.role) {
            const existingRole = await prisma.role.findUnique({
                where: { id: body.role },
            });

            if (!existingRole) {
                return res.status(404).json({ error: 'Role not found' });
            }
            roleId = existingRole.id;
        } else {
            roleId = 1;
        }

        const hashedPassword = await bcrypt.hash(body.password, saltRounds);
        await prisma.user.create({
            data: {
                firstname: body.firstname,
                lastname: body.lastname,
                email: body.email,
                password: hashedPassword,
                role: {
                    connect: { id: roleId },
                },
            },
        });

        res.status(201).json({ message: 'User successfully created' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


usersRouter.delete('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const existingUser = await prisma.user.findUnique({
            where: { id },
        });

        if (!existingUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        await prisma.user.delete({
            where: { id },
        });

        res.status(200).json({ message: 'User successfully deleted' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

usersRouter.put('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    const { firstname, lastname, email, password, role } = req.body;

    const existingRole = await prisma.role.findUnique({
        where: { id: role },
    });

    try {
        if (!existingRole) {
            return res.status(404).json({ error: 'Role not found' });
        }

        let hashedPassword = password;

        if (password) {
            hashedPassword = await bcrypt.hash(password, saltRounds);
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                firstname,
                lastname,
                email,
                ...(password && { password: hashedPassword }),
                role: {
                    connect: { id: existingRole.id },
                },
            },
        });

        const { password: _, ...userWithoutPassword } = updatedUser;
        res.status(200).json(userWithoutPassword);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default usersRouter;
