import express from 'express';
import * as RelationFilterController from '../controller/relationFilter.controller';

const RelationFilterRouter = express.Router();

RelationFilterRouter.post('/', RelationFilterController.create);

RelationFilterRouter.get('/', RelationFilterController.getAll);

RelationFilterRouter.get('/:id', RelationFilterController.getById);

RelationFilterRouter.put('/:id', RelationFilterController.update);

RelationFilterRouter.delete('/:id', RelationFilterController.remove);

export default RelationFilterRouter;
