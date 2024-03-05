import express from 'express';
import * as CategoryFilterController from '../controller/categoryFilter.controller';

const CategoryFilterRouter = express.Router();

CategoryFilterRouter.post('/', CategoryFilterController.create);

CategoryFilterRouter.get('/', CategoryFilterController.getAll);

CategoryFilterRouter.get('/:id', CategoryFilterController.getById);

CategoryFilterRouter.put('/:id', CategoryFilterController.update);

CategoryFilterRouter.delete('/:id', CategoryFilterController.remove);

export default CategoryFilterRouter;
