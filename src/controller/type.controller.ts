import { PrismaClient, Type } from '@prisma/client';
import { CreateTypeDTO, UpdateTypeDTO } from '../dto/TypeDTO';
import { Request, Response } from 'express';
import TypeRepository from '../repository/TypeRepository';

const prisma = new PrismaClient();

export async function getAll(req: Request, res: Response): Promise<void> {
  try {
    const types = await TypeRepository.findAll();
    res.json(types);
  } catch (e) {
    console.error('error fetching all types', e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function getById(req: Request, res: Response): Promise<void> {
  try {
    const id: string = req.params.id;
    const types = await TypeRepository.findById(Number(id));

    if (types === null) {
      console.error("Types doesn't exist");
      res.status(500).json({ error: "Types doesn't exist" });
      return;
    }

    res.status(200).json(types);
  } catch (e) {
    console.error('error fetching types', e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function create(req: Request, res: Response): Promise<void> {
  const body: CreateTypeDTO = req.body;

  try {
    const types = await TypeRepository.add(body);

    if (types === false) {
      res.status(500).json({ error: "Types doesn't exist" });
    }

    res.status(200).json(types);
  } catch (e) {
    console.error('error creating types', e);
    res.status(500).json(e);
  }
}

export async function update(req: Request, res: Response): Promise<void> {
  const id = req.params.id;

  const body: UpdateTypeDTO = req.body;

  try {
    const updatedTypes = await TypeRepository.edit(Number(id), body);
    res.status(200).json(updatedTypes);
  } catch (e) {
    console.error('error updating types:', e);
    res.status(500).json({ error: 'error' });
  }
}

export async function remove(req: Request, res: Response): Promise<void> {
  const id = req.params.id;

  try {
    await TypeRepository.delete(Number(id));
    res.status(204).json(id);
  } catch (e) {
    console.error('error deleting types:', e);
    res.status(500).json(e);
  }
}
