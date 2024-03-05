import { PrismaClient, Relation } from '@prisma/client';
import { CreateRelationDTO, UpdateRelationDTO } from '../dto/RelationDTO';
import {Request, Response} from "express";
import RelationRepository from "../repository/RelationRepository";

const prisma = new PrismaClient();

export async function getAll(req: Request, res: Response): Promise<void>{
    try{
        const relations = await RelationRepository.findAll();
        res.json(relations)
    }catch (e) {
        console.error("error fetching all relations", e);
        res.status(500).json({ error: "Internal Server Error",});
    }
}

export async function getById(req: Request, res: Response):Promise<void>{
    try{
        const id: string = req.params.id;
        const relations = await RelationRepository.findById(Number(id));

        if (relations === null){
            console.error('Relations doesn\'t exist');
            res.status(500).json({error: 'Relations doesn\'t exist'});
            return;
        }

        res.status(200).json(relations);
    }catch (e) {
        console.error('error fetching relations', e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function create(req: Request, res: Response):Promise<void>{
    const body: CreateRelationDTO = req.body;

    try {
        const relations = await RelationRepository.add(body);

        if (relations === false) {
            res.status(500).json({error: 'Relations doesn\'t exist'})
        }

        res.status(200).json(relations);

    } catch (e) {
        console.error('error creating relations', e);
        res.status(500).json(e)
    }
}

export async function update(req: Request, res: Response): Promise<void> {
    const id = req.params.id;

    const body: UpdateRelationDTO = req.body;

    try {
        const updatedRelation = await RelationRepository.edit(Number(id), body);
        res.status(200).json(updatedRelation);
    } catch(e) {
        console.error('error updating relation:', e);
        res.status(500).json({error: 'error'});
    }
}

export async function remove(req: Request, res: Response): Promise<void> {
    const id = req.params.id;

    try {
        await RelationRepository.delete(Number(id));
        res.status(204).json(id);
    } catch (e) {
        console.error('error deleting relation:', e);
        res.status(500).json(e);
    }
}
