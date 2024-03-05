import express from "express";
import * as RelationController from "../controller/relation.controller";

const RelationRouter = express.Router();

RelationRouter.get('', RelationController.getAll);

RelationRouter.get('/:id', RelationController.getById);

RelationRouter.post('', RelationController.create);

RelationRouter.put('/:id', RelationController.update);

RelationRouter.delete('/:id', RelationController.remove);
export default RelationRouter;