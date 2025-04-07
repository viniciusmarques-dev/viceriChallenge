import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecret';

export async function registerUser(name: string, email: string, password: string) {
  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists) throw new Error('E-mail já está em uso.');

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword }
  });

  return user;
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Usuário não encontrado.');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Senha incorreta.');

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' });
  return { token, user };
}
