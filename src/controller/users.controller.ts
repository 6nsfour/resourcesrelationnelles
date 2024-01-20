import { Request, Response } from "express";
import { CreateUserDTO, UpdateUserDTO } from "../dto/UserDTO";
import UserRepository from "../repository/UserRepository";

export async function getAll(req: Request, res:Response): Promise<void> {

    try {
        const users = await UserRepository.findAll();
        res.json(users);
    } catch(error) {
        console.error('error fetching all users', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function getById(req: Request, res:Response): Promise<void> {

    try {
        const id = req.params.id;

        const user = await UserRepository.findById(id);

        if(user === null) {
            console.error('User doesn\'t exist');
            res.status(500).json({error: 'User doesn\'t exist'});
            return;
        }

        res.status(200).json(user);
    } catch(error) {
        console.error('error fetching user', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function create(req: Request, res: Response): Promise<void> {
    const body: CreateUserDTO = req.body;

    try {
        const user = await UserRepository.add(body);

        if (user === false) {
            res.status(500).json({error: 'Role doesn\'t exist'})
        }

    } catch (error) {
        console.error('error creating user', error);
        res.status(500).json({error: 'internal server error'})
    }
}

export async function update(req: Request, res: Response): Promise<void> {
    const id = req.params.id;

    const body: UpdateUserDTO = req.body;

    try {
        const updatedUser = await UserRepository.edit(id, body);
        res.status(200).json(updatedUser);
    } catch(error) {
        console.error('error updating user:', error);
        res.status(500).json({error: 'error'});
    }
}

export async function remove(req: Request, res: Response): Promise<void> {
    const id = req.params.id;

    try {
        await UserRepository.delete(id);
        res.status(204).end();
    } catch(error) {
        console.error('error deleting user:', error);
        res.status(500).json({error: 'error'});
        
    }
}