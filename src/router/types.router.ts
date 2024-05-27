import express from 'express';
import * as TypeController from '../controller/type.controller';

const TypesRouter = express.Router();

TypesRouter.get('', TypeController.getAll);

TypesRouter.get('/:id', TypeController.getById);

TypesRouter.post('', TypeController.create);

TypesRouter.put('/:id', TypeController.update);

TypesRouter.delete('/:id', TypeController.remove);
export default TypesRouter;
