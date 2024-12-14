import express, { Application } from 'express';
import { userRoutes } from '@routes/userRoutes';
import { examRoutes } from '@routes/examRoutes';

export const app: Application = express();

app.use(express.json());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/exams', examRoutes);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  },
);
