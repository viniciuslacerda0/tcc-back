import { Router } from 'express';
import { authRoutes } from './auth.routes';
import { reportRoutes } from './report.routes';
import { userRoutes } from './user.routes';
import { pacientRoutes } from './pacient.routes';
import { evolutionRoutes } from './evolution.routes';

const router = Router();

router.use('/', authRoutes);
router.use('/', reportRoutes);
router.use('/', userRoutes);
router.use('/', pacientRoutes);
router.use('/', evolutionRoutes);

export default router;
