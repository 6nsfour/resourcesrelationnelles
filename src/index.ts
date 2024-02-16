import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import UsersRouter from './router/users.router';
import ResourcesRouter from './router/resources.router';
import RolesRouter from "./router/roles.router";
import StatusRouter from "./router/status.router";
import ReachRouter from "./router/reach.router";

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

app.listen(
    PORT,
    () => console.log(`Server is running at: http://localhost:${PORT}`)
);
