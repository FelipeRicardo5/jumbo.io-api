import { default as axios } from 'axios';
import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';  // Importação correta sem a extensão .ts

dotenv.config();

const app = express();
const port = process.env.PORT || 3030;

app.use(cors());
app.use(json());

app.use(userRoutes);  // Configurando as rotas do usuário

app.get('/', (req, res) => {
    res.send('Eu amo Maria de Fátima! E esse servidor está rodando :)');
});

// Inicializando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
