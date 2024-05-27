import { Request, Response } from 'express';
import ToCommentRepository from '../repository/ToCommentRepository';

export async function getAll(req: Request, res: Response): Promise<void> {
  try {
    const toComments = await ToCommentRepository.findAll();
    res.json(toComments);
  } catch (e) {
    console.error('error fetching all toComments', e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
export async function getById(req: Request, res: Response): Promise<void> {
  const { toCommentId } = req.params;

  try {
    const toComment = await ToCommentRepository.findById(Number(toCommentId));
    if (!toComment) {
      res.status(404).json({ message: 'toComment not found' });
      return;
    }
    res.json(toComment);
  } catch (e) {
    console.error('error fetching toComment by id', e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function create(req: Request, res: Response): Promise<void> {
  try {
    const success = await ToCommentRepository.add(req.body);
    if (!success) {
      res.status(400).json({ error: 'Could not add toComment' });
      return;
    }
    res.status(201).json({ message: 'toComment added successfully' });
  } catch (e) {
    console.error('error adding toComment', e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function remove(req: Request, res: Response): Promise<void> {
  const { toCommentId } = req.params;

  try {
    const success = await ToCommentRepository.delete(Number(toCommentId));
    if (!success) {
      res.status(404).json({ error: 'toComment not found' });
      return;
    }
    res.status(204).send();
  } catch (e) {
    console.error('error removing toComment:', e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
