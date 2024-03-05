import express from "express";
import * as CategoryController from "../controller/category.controller";

const CategoryRouter = express.Router();

CategoryRouter.get('', CategoryController.getAll);

CategoryRouter.get('/:id', CategoryController.getById);

CategoryRouter.post('', CategoryController.create);

CategoryRouter.put('/:id', CategoryController.update);

CategoryRouter.delete('/:id', CategoryController.remove);
export default CategoryRouter;