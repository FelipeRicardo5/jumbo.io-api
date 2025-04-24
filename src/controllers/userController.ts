import { Request, Response } from 'express';
import User from '../models/userModel';
import bcrypt from 'bcrypt';

// Criação de usuário
export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ error: 'Preencha todos os campos obrigatórios.' });
    return;
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(409).json({ error: 'E-mail já está em uso.' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: 'Usuário criado com sucesso.', userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar usuário.' });
  }
};

// Listar todos os usuários (cuidado com uso em produção)
export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().select('-password'); // não retorna senha
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários.' });
  }
};

// Buscar usuário por ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select('-password');
    if (!user) {
      res.status(404).json({ error: 'Usuário não encontrado.' });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário.' });
  }
};

export default {
  createUser,
  getAllUsers,
  getUserById,
};
