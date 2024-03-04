import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import UsersRouter from './router/users.router';
import ResourcesRouter from './router/resources.router';
import RolesRouter from "./router/roles.router";
import StatusRouter from "./router/status.router";
import ReachRouter from "./router/reach.router";
import TypesRouter from "./router/types.router";
import CategoryRouter from "./router/category.router";
import RelationRouter from "./router/relation.router";
import CommentRouter from "./router/comment.router";
import FavoriteRouter from "./router/favorite.router";
import ToCommentRouter from "./router/toComment.router";
import CategoryFilterRouter from "./router/categoryFilter.router";
import relationFilterRouter from "./router/relationFilter.router";
import AuthRouter from './router/auth.router';

const app = express();
const PORT = 8080;

app.use(express.json());

app.use(morgan('dev'));

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,
}));

app.use('/api/users', UsersRouter);
app.use('/api/resources', ResourcesRouter);
app.use('/api/roles', RolesRouter);
app.use('/api/status', StatusRouter);
app.use('/api/reach', ReachRouter);
app.use('/api/type', TypesRouter);
app.use('/api/category', CategoryRouter);
app.use('/api/relation', RelationRouter);
app.use('/api/comment', CommentRouter);
app.use('/api/favorite', FavoriteRouter);
app.use('/api/toComment', ToCommentRouter);
app.use('/api/categoryFilter', CategoryFilterRouter);
app.use('/api/relationFilter', relationFilterRouter);
app.use('/api/auth', AuthRouter);

app.listen(
    PORT,
    () => console.log(`Server is running at: http://localhost:${PORT}`)
);
