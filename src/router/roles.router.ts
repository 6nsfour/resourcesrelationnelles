import express from 'express';
import * as RoleController from '../controller/roles.controller';

const RolesRouter = express.Router();

RolesRouter.get('', RoleController.getAll);

RolesRouter.get('/:id', RoleController.getById);

RolesRouter.post('', RoleController.create);

RolesRouter.put('/:id', RoleController.update);

RolesRouter.delete('/:id', RoleController.remove);
export default RolesRouter;
