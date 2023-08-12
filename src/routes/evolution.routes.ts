import { Router } from 'express';
import { EvolutionController } from '../controllers/EvolutionControler';
import authMiddleware from '../middlewares/authMiddleware';

const evolutionRoutes = Router();

const evolutionControllerInstance = new EvolutionController();

evolutionRoutes.post('/create-evolution', authMiddleware, evolutionControllerInstance.createEvolution);
evolutionRoutes.get('/get-evolution', authMiddleware, evolutionControllerInstance.getPacientEvolution);

export { evolutionRoutes };
