import { Router } from 'express';
import { UserController } from '@controllers/userController';

export const userRoutes = Router();

userRoutes.post('/', UserController.createUser);
