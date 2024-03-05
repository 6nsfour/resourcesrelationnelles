import express from "express";
import * as StatusController from "../controller/status.controller";

const StatusRouter = express.Router();

StatusRouter.get('', StatusController.getAll);

StatusRouter.get('/:id', StatusController.getById);

StatusRouter.post('', StatusController.create);

StatusRouter.put('/:id', StatusController.update);

StatusRouter.delete('/:id', StatusController.remove);
export default StatusRouter;