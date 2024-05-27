import { Request, Response } from 'express';
import FavoriteRepository from '../repository/FavoriteRepository';

export async function getAll(req: Request, res: Response): Promise<void> {
  try {
    const favorites = await FavoriteRepository.findAll();
    res.json(favorites);
  } catch (e) {
    console.error('error fetching all favorites', e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function getByUserIdAndResourceId(
  req: Request,
  res: Response
): Promise<void> {
  const { userId, resourceId } = req.params;

  try {
    const favorite = await FavoriteRepository.findByUserIdAndResourceId(
      userId,
      Number(resourceId)
    );
    if (!favorite) {
      res.status(404).json({ message: 'Favorite not found' });
      return;
    }
    res.json(favorite);
  } catch (e) {
    console.error('error fetching favorite', e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function create(req: Request, res: Response): Promise<void> {
  try {
    const success = await FavoriteRepository.add(req.body);
    if (!success) {
      res.status(400).json({ error: 'Could not add favorite' });
      return;
    }
    res.status(201).json({ message: 'Favorite added successfully' });
  } catch (e) {
    console.error('error adding favorite', e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function remove(req: Request, res: Response): Promise<void> {
  const { userId, resourceId } = req.params;

  try {
    const success = await FavoriteRepository.delete(userId, Number(resourceId));
    if (!success) {
      res.status(404).json({ error: 'Favorite not found' });
      return;
    }
    res.status(204).send();
  } catch (e) {
    console.error('error removing favorite:', e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
