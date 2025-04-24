import { Router } from 'express';
import scoreController from '../controllers/scoreController';
const router = Router();
router.post('/scores', scoreController.addScore);
router.get('/scores', scoreController.getAllScores);
router.get('/scores/user/:userId', scoreController.getScoresByUser);
export default router;
