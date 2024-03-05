import express from "express";
import * as CommentController from "../controller/comment.controller";

const CommentRouter = express.Router();

CommentRouter.get('', CommentController.getAll);

CommentRouter.get('/:id', CommentController.getById);

CommentRouter.post('', CommentController.create);

CommentRouter.put('/:id', CommentController.update);

CommentRouter.delete('/:id', CommentController.remove);
export default CommentRouter;