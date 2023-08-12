import { Router } from 'express';
import { ReportController } from '../controllers/ReportControler';
import authMiddleware from '../middlewares/authMiddleware';

const reportRoutes = Router();

const reportControllerInstance = new ReportController();

reportRoutes.post('/create-report', authMiddleware, reportControllerInstance.createReport);
reportRoutes.get('/get-report', authMiddleware, reportControllerInstance.getReport);
reportRoutes.put('/update-report', authMiddleware, reportControllerInstance.updateReport);

export { reportRoutes };
