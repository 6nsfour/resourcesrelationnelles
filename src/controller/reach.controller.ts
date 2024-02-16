import { Request, Response } from "express";
import {CreateReachDTO, UpdateReachDTO} from "../dto/ReachDTO";
import ReachRepository from "../repository/ReachRepository";



export async function getAll(req: Request, res: Response): Promise<void>{
    try{
        const reach = await ReachRepository.findAll();
        res.json(reach)
    }catch (e) {
        console.error("error fetching all reach", e);
        res.status(500).json({ error: "Internal Server Error",});
    }
}

export async function getById(req: Request, res: Response):Promise<void>{
    try{
        const id: string = req.params.id;
        const reach = await ReachRepository.findById(Number(id));

        if (reach === null){
            console.error('Reach doesn\'t exist');
            res.status(500).json({error: 'Reach doesn\'t exist'});
            return;
        }

        res.status(200).json(reach);
    }catch (e) {
        console.error('error fetching reach', e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function create(req: Request, res: Response):Promise<void>{
    const body: CreateReachDTO = req.body;

    try {
        const reach = await ReachRepository.add(body);

        if (reach === false) {
            res.status(500).json({error: 'Reach doesn\'t exist'})
        }

        res.status(200).json(reach);

    } catch (e) {
        console.error('error creating reach', e);
        res.status(500).json(e)
    }
}

export async function update(req: Request, res: Response): Promise<void> {
    const id = req.params.id;

    const body: UpdateReachDTO = req.body;

    try {
        const updatedReach = await ReachRepository.edit(Number(id), body);
        res.status(200).json(updatedReach);
    } catch(e) {
        console.error('error updating reach:', e);
        res.status(500).json({error: 'error'});
    }
}

export async function remove(req: Request, res: Response): Promise<void> {
    const id = req.params.id;

    try {
        await ReachRepository.delete(Number(id));
        res.status(204).json(id);
    } catch (e) {
        console.error('error deleting reach:', e);
        res.status(500).json(e);
    }
}