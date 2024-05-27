import express from 'express';
import * as ReachController from '../controller/reach.controller';

const ReachRouter = express.Router();

ReachRouter.get('', ReachController.getAll);

ReachRouter.get('/:id', ReachController.getById);

ReachRouter.post('', ReachController.create);

ReachRouter.put('/:id', ReachController.update);

ReachRouter.delete('/:id', ReachController.remove);
export default ReachRouter;
