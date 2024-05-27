import express from 'express';
import * as AuthController from '../controller/auth.controller';

const AuthRouter = express.Router();

AuthRouter.post('/login', AuthController.login);
AuthRouter.post('/register', AuthController.register);

export default AuthRouter;
