import express from 'express';
import * as UserController from '../controller/users.controller';

const UsersRouter = express.Router();

UsersRouter.get('', UserController.getAll);

UsersRouter.get('/:id', UserController.getById);

UsersRouter.post('', UserController.create);

UsersRouter.patch('/:id', UserController.update);

UsersRouter.delete('/:id', UserController.remove);

export default UsersRouter;
