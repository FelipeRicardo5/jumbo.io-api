import { Router } from 'express';
import { createBadge, awardBadgeToUser, getUserBadges } from '../controllers/badgeController';

const router = Router();

router.post('/badges', createBadge); // Admin ou sistema
router.post('/badges/award', awardBadgeToUser); // Quando usuário conquista algo
router.get('/badges/:userId', getUserBadges); // Ver badges do usuário

export default router;