import { Request, Response } from 'express';
import Badge from '../models/badgeModel';
import UserBadge from '../models/userBadgeModel';

export const createBadge = async (req: Request, res: Response): Promise<void> => {
  const { name, description, iconUrl } = req.body;

  if (!name || !description) {
    res.status(400).json({ error: 'Nome e descrição são obrigatórios.' });
    return;
  }

  try {
    const badge = await Badge.create({ name, description, iconUrl });
    res.status(201).json({ message: 'Badge criada com sucesso.', badge });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar badge.' });
  }
};

export const awardBadgeToUser = async (req: Request, res: Response): Promise<void> => {
  const { userId, badgeId } = req.body;

  try {
    const awarded = await UserBadge.create({ userId, badgeId });
    res.status(201).json({ message: 'Badge atribuída ao usuário.', awarded });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atribuir badge.' });
  }
};

export const getUserBadges = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  try {
    const badges = await UserBadge.find({ userId }).populate('badgeId');
    res.json(badges);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar badges do usuário.' });
  }
};
