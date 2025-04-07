import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/authService';

export const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;
      const user = await registerUser(name, email, password);
      res.status(201).json({ id: user.id, name: user.name, email: user.email });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const { token, user } = await loginUser(email, password);
      res.status(200).json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
};
