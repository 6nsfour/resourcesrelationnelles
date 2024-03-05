import { Request, Response } from "express";
import RelationFilterRepository from "../repository/RelationFilterRepository";

export async function create(req: Request, res: Response): Promise<void> {
    try {
        const success = await RelationFilterRepository.add(req.body);
        if (!success) {
            res.status(400).json({ error: 'Could not add RelationFilter' });
            return;
        }
        res.status(201).json({ message: 'RelationFilter added successfully' });
    } catch (e) {
        console.error('Error adding RelationFilter', e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function getAll(req: Request, res: Response): Promise<void> {
    try {
        const relationFilters = await RelationFilterRepository.findAll();
        res.json(relationFilters);
    } catch (e) {
        console.error("Error fetching all RelationFilters", e);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function remove(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
        const success = await RelationFilterRepository.delete(Number(id));
        if (!success) {
            res.status(404).json({ error: 'RelationFilter not found' });
            return;
        }
        res.status(204).send();
    } catch (e) {
        console.error('Error removing RelationFilter:', e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function getById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
        const relationFilter = await RelationFilterRepository.findById(Number(id));
        if (!relationFilter) {
            res.status(404).json({ message: 'RelationFilter not found' });
            return;
        }
        res.json(relationFilter);
    } catch (e) {
        console.error("Error fetching RelationFilter by ID", e);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const success = await RelationFilterRepository.edit(Number(id), updateData);
        if (!success) {
            res.status(404).json({ message: 'RelationFilter not found or not updated' });
            return;
        }
        res.json({ message: 'RelationFilter updated successfully' });
    } catch (e) {
        console.error("Error updating RelationFilter", e);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

