import { Request, Response } from 'express';
import MoodLog from '../models/moodModel';

export const addMoodLog = async (req: Request, res: Response): Promise<void> => {
  const { userId, mood } = req.body;

  if (!userId || !mood) {
    res.status(400).json({ error: 'userId e mood são obrigatórios.' });
    return;
  }

  try {
    const log = await MoodLog.create({ userId, mood });
    res.status(201).json({ message: 'Mood registrado com sucesso.', log });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao registrar humor.' });
  }
};

export const getUserMoodLogs = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  try {
    const logs = await MoodLog.find({ userId }).sort({ createdAt: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar registros de humor.' });
  }
};
