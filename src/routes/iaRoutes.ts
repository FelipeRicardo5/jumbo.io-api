import express from 'express'
import { iaController } from '../controllers/iaController'

const router = express.Router();

router.post('/ia', iaController.gerarDesafio);

export default router;
