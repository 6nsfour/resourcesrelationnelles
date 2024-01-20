import { Request, Response } from "express";
import { CreateResourceDTO, UpdateResourceDTO } from "../dto/ResourceDTO";
import ResourceRepository from "../repository/ResourceRepository";
import { error } from "console";

export async function getAll(req: Request, res: Response): Promise<void> {
    //#TODO check that only admin can. faire les users a la fin
    try {
        const resources = await ResourceRepository.findAll();
        res.json(resources);
    } catch(error) {
        console.error('error fetching all resources', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function getById(req: Request, res: Response): Promise<void> {
    //#TODO check that only user can
    try {
        const id = +req.params.id;
        const resource = await ResourceRepository.findById(id);
        res.status(200).json(resource);
    } catch (error) {
        console.error('error fetching specific resource', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function create(req: Request, res: Response): Promise<void> {
    //#TODO check that the user is logged in and is a valid user
    const body: CreateResourceDTO = req.body;

    try {
        const resource = await ResourceRepository.add(body);

        //#TODO Au lieu de return false return retourner le/les champs non existant.
        if('error' in resource) {
            console.error('those field(s) are missing :', resource.errors.toString());
            res.status(500).json({error: 'mettre une bonne erreur ici'});
            return;
        }

        res.status(201).json({ message: 'Resource successfully created', resource });
    } catch (error) {
        console.error('error creating resource:', error);
        res.status(500).json({ error: 'internal server error' });
    }
}

export async function update(req: Request, res: Response): Promise<void> {
    //#TODO check that the user is logged in, is a valid user and resource belongs to him
    const id = +req.params.id;

    const body: UpdateResourceDTO = req.body;

    try {
        const updatedResource = await ResourceRepository.edit(id, body);
        res.status(200).json(updatedResource);
    } catch(error) {
        console.error('error updating resource:', error);
        res.status(500).json({error: 'error'})
    }
}

export async function remove(req: Request, res: Response): Promise<void> {
    //#TODO check that the user is logged in, is a valid user and resource belongs to him
    const id = +req.params.id;
    try {
        await ResourceRepository.delete(id);
        res.status(204).end();
    } catch(error) {
        console.error('error deleting resource', error);
        res.status(500).json({ error: 'internal server error' });
    }
}
