import express, { Request, Response } from "express";
import { CreateResourcesDTO } from "../dto/ResourceDTO";
import ResourceRepository from "../repository/ResourceRepository";

const resourcesRouter = express.Router();

resourcesRouter.get('/', async (req: Request, res: Response) => {
    try {
        const resources = await ResourceRepository.findAll();
        res.json(resources);
    } catch(error) {
        console.error('error fetching all users', error);
    }
});

resourcesRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = +req.params.id;
        const resource = await ResourceRepository.findById(id);
        res.status(200).json(resource);
    } catch (error) {
        console.error('error fetching specific resource', error);
        
    }
})

resourcesRouter.post('/', async (req: Request, res: Response) => {
    const body: CreateResourcesDTO = req.body;
    try{
        const resource = await ResourceRepository.create(body);
        res.status(201).json({ message: 'Resource successfully created', resource });
    } catch (error) {
        console.error('error creating resource:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// resourcesRouter.patch();

resourcesRouter.delete('/:id', async (req: Request, res: Response) => {
    const id = +req.params.id;
    try {
        await ResourceRepository.delete(id);
        res.status(204);
    } catch(error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default resourcesRouter;

