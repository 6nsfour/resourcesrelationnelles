import express from 'express';
import * as ToCommentController from '../controller/toComment.controller';

const ToCommentrouter = express.Router();

ToCommentrouter.get('/', ToCommentController.getAll);

ToCommentrouter.get('/:toCommentId', ToCommentController.getById);

ToCommentrouter.post('/', ToCommentController.create);

ToCommentrouter.delete('/:toCommentId', ToCommentController.remove);

export default ToCommentrouter;
