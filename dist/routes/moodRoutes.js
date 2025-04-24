import { Router } from 'express';
import { addMoodLog, getUserMoodLogs } from '../controllers/moodController';
const router = Router();
router.post('/mood', addMoodLog);
router.get('/mood/:userId', getUserMoodLogs);
export default router;
