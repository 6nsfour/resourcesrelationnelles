import { Request, Response } from 'express';
import { CreateRoleDTO, UpdateRoleDTO } from '../dto/RoleDTO';
import RoleRepository from '../repository/RoleRepository';

export async function getAll(req: Request, res: Response): Promise<void> {
  try {
    const roles = await RoleRepository.findAll();
    res.json(roles);
  } catch (e) {
    console.error('error fetching all roles', e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function getById(req: Request, res: Response): Promise<void> {
  try {
    const id: string = req.params.id;
    const role = await RoleRepository.findById(Number(id));

    if (role === null) {
      console.error("Role doesn't exist");
      res.status(500).json({ error: "Role doesn't exist" });
      return;
    }

    res.status(200).json(role);
  } catch (e) {
    console.error('error fetching role', e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function create(req: Request, res: Response): Promise<void> {
  const body: CreateRoleDTO = req.body;

  try {
    const role = await RoleRepository.add(body);

    if (role === false) {
      res.status(500).json({ error: "Role doesn't exist" });
    }

    res.status(200).json(role);
  } catch (e) {
    console.error('error creating role', e);
    res.status(500).json(e);
  }
}

export async function update(req: Request, res: Response): Promise<void> {
  const id = req.params.id;

  const body: UpdateRoleDTO = req.body;

  try {
    const updatedRole = await RoleRepository.edit(Number(id), body);
    res.status(200).json(updatedRole);
  } catch (e) {
    console.error('error updating role:', e);
    res.status(500).json({ error: 'error' });
  }
}

export async function remove(req: Request, res: Response): Promise<void> {
  const id = req.params.id;

  try {
    await RoleRepository.delete(Number(id));
    res.status(204).json(id);
  } catch (e) {
    console.error('error deleting role:', e);
    res.status(500).json(e);
  }
}
