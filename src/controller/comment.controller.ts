import { PrismaClient, Comment } from '@prisma/client';
import { CreateCommentDTO, UpdateCommentDTO } from '../dto/CommentDTO';
import { Request, Response } from 'express';
import CommentRepository from '../repository/CommentRepository';

const prisma = new PrismaClient();

export async function getAll(req: Request, res: Response): Promise<void> {
  try {
    const comments = await CommentRepository.findAll();
    res.json(comments);
  } catch (e) {
    console.error('error fetching all comments', e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function getById(req: Request, res: Response): Promise<void> {
  try {
    const id: string = req.params.id;
    const comments = await CommentRepository.findById(Number(id));

    if (comments === null) {
      console.error("Comments doesn't exist");
      res.status(500).json({ error: "Comments doesn't exist" });
      return;
    }

    res.status(200).json(comments);
  } catch (e) {
    console.error('error fetching comments', e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function create(req: Request, res: Response): Promise<void> {
  const body: CreateCommentDTO = req.body;

  try {
    const comments = await CommentRepository.add(body);

    if (comments === false) {
      res.status(500).json({ error: 'Comment already exists' });
      return;
    }

    res.status(200).json(comments);
  } catch (e) {
    console.error('error creating comments', e);
    res.status(500).json(e);
  }
}

export async function update(req: Request, res: Response): Promise<void> {
  const id = req.params.id;

  const body: UpdateCommentDTO = req.body;

  try {
    const updatedComment = await CommentRepository.edit(Number(id), body);
    res.status(200).json(updatedComment);
  } catch (e) {
    console.error('error updating comment:', e);
    res.status(500).json({ error: 'error' });
  }
}

export async function remove(req: Request, res: Response): Promise<void> {
  const id = req.params.id;

  try {
    await CommentRepository.delete(Number(id));
    res.status(204).json(id);
  } catch (e) {
    console.error('error deleting comment:', e);
    res.status(500).json(e);
  }
}
