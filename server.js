import { default as axios } from 'axios';
import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3030;

// Defina a URL da API de inferência do Hugging Face para o modelo
const urlApi = 'https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-1B';
const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY; // Certifique-se de ter o token no .env

app.use(cors());
app.use(json());

app.post('/ia', async (req, res) => {
    const { mood } = req.body;

    if (!mood || typeof mood !== 'string' || mood.trim() === '') {
        return res.status(400).json({ error: 'Texto inválido' });
    }

    let prompt = '';

    if (mood === 'animado e energético 💪') {
        prompt = 'Com no máximo 200 caracteres retorne sem aspas, você é um incentivador motivacional. Dê um desafio curto, difícil, relacionado ao bem-estar, que eu possa completar rapidamente.';
    } 
    else if (mood === 'poderia estar melhor 😔') {
        prompt = 'Com no máximo 200 caracteres retorne sem aspas, você é um incentivador motivacional. Dê-me um desafio moderado de bem-estar que eu possa fazer rapidamente texto sem aspas.';
    } else if (mood === 'tive um dia difícil 😡') {
        prompt = 'Com no máximo 200 caracteres retorne sem aspas, Dê-me um desafio fácil, rápido e relacionado ao bem-estar para ajudar a melhorar minha condição.';
    } else {
        return res.status(400).json({ error: 'Mood inválido' });
    }

    try {
        // Fazendo a requisição para a API do Hugging Face
        const response = await axios.post(
            urlApi, 
            { inputs: prompt }, 
            { 
                headers: { Authorization: `Bearer ${HUGGINGFACE_API_KEY}` } // Cabeçalho com o token de autorização
            }
        );

        // Retorna o desafio gerado pela API
        res.json({ challenge: response.data[0].generated_text });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao gerar desafio' });
    }
});

app.listen(port, () => {
    console.log(`Tamo rodando na porta ${port}`);
});
