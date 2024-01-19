import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import usersRouter from './router/usersRouter';
import resourcesRouter from './router/resourcesRouter';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,
}));
app.use('/api/users', usersRouter);
app.use('/api/resources', resourcesRouter);

app.listen(
    PORT,
    () => console.log(`Server is running at: http://localhost:${PORT}`)
);
