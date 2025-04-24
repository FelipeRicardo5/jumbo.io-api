import { Request, Response } from 'express';
import Score from '../models/scoreModel';

// Criar novo score (ex: após completar um desafio)
export const addScore = async (req: Request, res: Response): Promise<void> => {
  const { userId, challenge, points } = req.body;

  if (!userId || !challenge || typeof points !== 'number') {
    res.status(400).json({ error: 'Dados inválidos.' });
    return;
  }

  try {
    const score = await Score.create({ userId, challenge, points });
    res.status(201).json({ message: 'Score registrado com sucesso.', score });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao registrar score.' });
  }
};

// Buscar todos os scores (ex: para ranking)
export const getAllScores = async (_req: Request, res: Response): Promise<void> => {
  try {
    const scores = await Score.find().populate('userId', 'name email');
    res.json(scores);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar scores.' });
  }
};

// Buscar scores por usuário
export const getScoresByUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  try {
    const scores = await Score.find({ userId }).sort({ createdAt: -1 });
    res.json(scores);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar scores do usuário.' });
  }
};

export default {
  addScore,
  getAllScores,
  getScoresByUser,
};
