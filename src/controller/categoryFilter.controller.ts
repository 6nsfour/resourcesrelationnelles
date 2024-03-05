import { Request, Response } from "express";
import CategoryFilterRepository from "../repository/CategoryFilterRepository";

export async function create(req: Request, res: Response): Promise<void> {
    try {
        const success = await CategoryFilterRepository.add(req.body);
        if (!success) {
            res.status(400).json({ error: 'Could not add CategoryFilter' });
            return;
        }
        res.status(201).json({ message: 'CategoryFilter added successfully' });
    } catch (e) {
        console.error('Error adding CategoryFilter', e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function getAll(req: Request, res: Response): Promise<void> {
    try {
        const categoryFilters = await CategoryFilterRepository.findAll();
        res.json(categoryFilters);
    } catch (e) {
        console.error("Error fetching all CategoryFilters", e);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function getById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
        const categoryFilter = await CategoryFilterRepository.findById(Number(id));
        if (!categoryFilter) {
            res.status(404).json({ message: 'CategoryFilter not found' });
            return;
        }
        res.json(categoryFilter);
    } catch (e) {
        console.error("Error fetching CategoryFilter by id", e);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


export async function update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updated = await CategoryFilterRepository.edit(Number(id), updateData);
        if (!updated) {
            res.status(404).json({ message: 'CategoryFilter not found' });
            return;
        }
        res.status(200).json({ message: 'CategoryFilter updated successfully', data: updated });
    } catch (e) {
        console.error('Error updating CategoryFilter', e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function remove(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
        const success = await CategoryFilterRepository.delete(Number(id));
        if (!success) {
            res.status(404).json({ error: 'CategoryFilter not found' });
            return;
        }
        res.status(204).send();
    } catch (e) {
        console.error('Error removing CategoryFilter:', e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
