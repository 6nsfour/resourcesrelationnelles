import express from 'express';
import * as ResourceController from '../controller/resources.controller';

const ResourcesRouter = express.Router();

ResourcesRouter.get('/', ResourceController.getAll);

ResourcesRouter.get('/:id', ResourceController.getById);

ResourcesRouter.post('/', ResourceController.create);

ResourcesRouter.patch('/:id', ResourceController.update);

ResourcesRouter.delete('/:id', ResourceController.remove);

export default ResourcesRouter;
