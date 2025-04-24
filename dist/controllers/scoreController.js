var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Score from '../models/scoreModel';
// Criar novo score (ex: após completar um desafio)
export const addScore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, challenge, points } = req.body;
    if (!userId || !challenge || typeof points !== 'number') {
        res.status(400).json({ error: 'Dados inválidos.' });
        return;
    }
    try {
        const score = yield Score.create({ userId, challenge, points });
        res.status(201).json({ message: 'Score registrado com sucesso.', score });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao registrar score.' });
    }
});
// Buscar todos os scores (ex: para ranking)
export const getAllScores = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const scores = yield Score.find().populate('userId', 'name email');
        res.json(scores);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar scores.' });
    }
});
// Buscar scores por usuário
export const getScoresByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const scores = yield Score.find({ userId }).sort({ createdAt: -1 });
        res.json(scores);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar scores do usuário.' });
    }
});
export default {
    addScore,
    getAllScores,
    getScoresByUser,
};
