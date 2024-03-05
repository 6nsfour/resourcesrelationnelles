import { PrismaClient, Category } from '@prisma/client';
import { CreateCategoryDTO, UpdateCategoryDTO } from '../dto/CategoryDTO';
import {Request, Response} from "express";
import CategoryRepository from "../repository/CategoryRepository";

const prisma = new PrismaClient();

export async function getAll(req: Request, res: Response): Promise<void>{
    try{
        const categories = await CategoryRepository.findAll();
        res.json(categories)
    }catch (e) {
        console.error("error fetching all categories", e);
        res.status(500).json({ error: "Internal Server Error",});
    }
}

export async function getById(req: Request, res: Response):Promise<void>{
    try{
        const id: string = req.params.id;
        const categories = await CategoryRepository.findById(Number(id));

        if (categories === null){
            console.error('Categories doesn\'t exist');
            res.status(500).json({error: 'Categories doesn\'t exist'});
            return;
        }

        res.status(200).json(categories);
    }catch (e) {
        console.error('error fetching categories', e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function create(req: Request, res: Response):Promise<void>{
    const body: CreateCategoryDTO = req.body;

    try {
        const categories = await CategoryRepository.add(body);

        if (categories === false) {
            res.status(500).json({error: 'Categories doesn\'t exist'})
        }

        res.status(200).json(categories);

    } catch (e) {
        console.error('error creating categories', e);
        res.status(500).json(e)
    }
}

export async function update(req: Request, res: Response): Promise<void> {
    const id = req.params.id;

    const body: UpdateCategoryDTO = req.body;

    try {
        const updatedCategory = await CategoryRepository.edit(Number(id), body);
        res.status(200).json(updatedCategory);
    } catch(e) {
        console.error('error updating category:', e);
        res.status(500).json({error: 'error'});
    }
}

export async function remove(req: Request, res: Response): Promise<void> {
    const id = req.params.id;

    try {
        await CategoryRepository.delete(Number(id));
        res.status(204).json(id);
    } catch (e) {
        console.error('error deleting category:', e);
        res.status(500).json(e);
    }
}
