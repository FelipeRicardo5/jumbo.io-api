var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Badge from '../models/badgeModel';
import UserBadge from '../models/userBadgeModel';
export const createBadge = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, iconUrl } = req.body;
    if (!name || !description) {
        res.status(400).json({ error: 'Nome e descrição são obrigatórios.' });
        return;
    }
    try {
        const badge = yield Badge.create({ name, description, iconUrl });
        res.status(201).json({ message: 'Badge criada com sucesso.', badge });
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao criar badge.' });
    }
});
export const awardBadgeToUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, badgeId } = req.body;
    try {
        const awarded = yield UserBadge.create({ userId, badgeId });
        res.status(201).json({ message: 'Badge atribuída ao usuário.', awarded });
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao atribuir badge.' });
    }
});
export const getUserBadges = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const badges = yield UserBadge.find({ userId }).populate('badgeId');
        res.json(badges);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar badges do usuário.' });
    }
});
