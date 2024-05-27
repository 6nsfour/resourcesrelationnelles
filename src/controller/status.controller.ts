import { Request, Response } from 'express';
import { CreateStatusDTO, UpdateStatusDTO } from '../dto/StatusDTO';
import StatusRepository from '../repository/StatusRepository';
import statusRepository from '../repository/StatusRepository';

export async function getAll(req: Request, res: Response): Promise<void> {
  try {
    const status = await StatusRepository.findAll();
    res.json(status);
  } catch (e) {
    console.error('error fetching all status', e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function getById(req: Request, res: Response): Promise<void> {
  try {
    const id: string = req.params.id;
    const status = await StatusRepository.findById(Number(id));

    if (status === null) {
      console.error("Status doesn't exist");
      res.status(500).json({ error: "Status doesn't exist" });
      return;
    }

    res.status(200).json(status);
  } catch (e) {
    console.error('error fetching status', e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function create(req: Request, res: Response): Promise<void> {
  const body: CreateStatusDTO = req.body;

  try {
    const status = await StatusRepository.add(body);

    if (status === false) {
      res.status(500).json({ error: "Status doesn't exist" });
    }

    res.status(200).json(status);
  } catch (e) {
    console.error('error creating status', e);
    res.status(500).json(e);
  }
}

export async function update(req: Request, res: Response): Promise<void> {
  const id = req.params.id;

  const body: UpdateStatusDTO = req.body;

  try {
    const updatedStatus = await StatusRepository.edit(Number(id), body);
    res.status(200).json(updatedStatus);
  } catch (e) {
    console.error('error updating status:', e);
    res.status(500).json({ error: 'error' });
  }
}

export async function remove(req: Request, res: Response): Promise<void> {
  const id = req.params.id;

  try {
    await statusRepository.delete(Number(id));
    res.status(204).json(id);
  } catch (e) {
    console.error('error deleting status:', e);
    res.status(500).json(e);
  }
}
