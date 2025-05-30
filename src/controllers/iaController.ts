import axios from 'axios';
import { Request, Response } from 'express';
import dotenv from 'dotenv'

dotenv.config();

const urlApi = process.env.HUGGINGFACE_API_URL || ''; // coloque sua URL real aqui ou no .env
const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY || '';

export const iaController = {
  async gerarDesafio(req: Request, res: Response): Promise<void> {
    const { mood } = req.body;

    if (!mood || typeof mood !== 'string' || mood.trim() === '') {
      res.status(400).json({ error: 'Texto inválido' });
      return;
    }

    let prompt = '';

    if (mood === 'animado e energético 💪') {
      prompt = 'Com no máximo 200 caracteres retorne sem aspas, você é um incentivador motivacional. Dê um desafio curto, difícil, relacionado ao bem-estar, que eu possa completar rapidamente.';
    } else if (mood === 'poderia estar melhor 😔') {
      prompt = 'Com no máximo 200 caracteres retorne sem aspas, você é um incentivador motivacional. Dê-me um desafio moderado de bem-estar que eu possa fazer rapidamente texto sem aspas.';
    } else if (mood === 'tive um dia difícil 😡') {
      prompt = 'Com no máximo 200 caracteres retorne sem aspas, Dê-me um desafio fácil, rápido e relacionado ao bem-estar para ajudar a melhorar minha condição.';
    } else {
      res.status(400).json({ error: 'Mood inválido' });
      return;
    }

    try {
      const response = await axios.post(
        urlApi,
        { inputs: prompt },
        {
          headers: {
            Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
          },
        }
      );

      res.json({ challenge: response.data[0].generated_text });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao gerar desafio' });
    }
  },
};

export default iaController;
