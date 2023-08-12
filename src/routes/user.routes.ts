import { Router } from 'express';
import { UserController } from '../controllers/UserControler';

const userRoutes = Router();

const userControllerInstance = new UserController();

userRoutes.post('/create', userControllerInstance.createUser);

export { userRoutes };
