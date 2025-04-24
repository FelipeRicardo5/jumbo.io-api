var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from '../models/userModel';
import bcrypt from 'bcrypt';
// Criação de usuário
export const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400).json({ error: 'Preencha todos os campos obrigatórios.' });
        return;
    }
    try {
        const userExists = yield User.findOne({ email });
        if (userExists) {
            res.status(409).json({ error: 'E-mail já está em uso.' });
            return;
        }
        const hashedPassword = yield bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword,
        });
        yield user.save();
        res.status(201).json({ message: 'Usuário criado com sucesso.', userId: user._id });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar usuário.' });
    }
});
// Listar todos os usuários (cuidado com uso em produção)
export const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User.find().select('-password'); // não retorna senha
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
});
// Buscar usuário por ID
export const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield User.findById(id).select('-password');
        if (!user) {
            res.status(404).json({ error: 'Usuário não encontrado.' });
            return;
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuário.' });
    }
});
export default {
    createUser,
    getAllUsers,
    getUserById,
};
