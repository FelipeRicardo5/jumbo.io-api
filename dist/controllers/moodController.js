var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import MoodLog from '../models/moodModel';
export const addMoodLog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, mood } = req.body;
    if (!userId || !mood) {
        res.status(400).json({ error: 'userId e mood são obrigatórios.' });
        return;
    }
    try {
        const log = yield MoodLog.create({ userId, mood });
        res.status(201).json({ message: 'Mood registrado com sucesso.', log });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao registrar humor.' });
    }
});
export const getUserMoodLogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const logs = yield MoodLog.find({ userId }).sort({ createdAt: -1 });
        res.json(logs);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar registros de humor.' });
    }
});
