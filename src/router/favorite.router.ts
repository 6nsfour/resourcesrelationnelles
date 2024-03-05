import express from "express";
import * as FavoriteController from "../controller/favorite.controller";

const FavoriteRouter = express.Router();

FavoriteRouter.get('/', FavoriteController.getAll);

FavoriteRouter.get('/user/:userId/resource/:resourceId', FavoriteController.getByUserIdAndResourceId);

FavoriteRouter.post('/', FavoriteController.create);

FavoriteRouter.delete('/user/:userId/resource/:resourceId', FavoriteController.remove);

export default FavoriteRouter;
