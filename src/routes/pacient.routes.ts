import { Router } from 'express';
import { PacientController } from '../controllers/PacientControler';
import authMiddleware from '../middlewares/authMiddleware';

const pacientRoutes = Router();

const pacientControllerInstance = new PacientController();

pacientRoutes.get('/get-pacients', authMiddleware, pacientControllerInstance.getPacients);

export { pacientRoutes };
