import { prisma } from '../lib/prisma';

export const taskService = {
  create: async (description: string, priority: string, userId: number) => {
    return await prisma.task.create({
      data: { description, priority, userId },
    });
  },

  listByUser: async (userId: number) => {
    return await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  },

  toggleDone: async (taskId: number, userId: number) => {
    const task = await prisma.task.findFirst({ where: { id: taskId, userId } });
    if (!task) throw new Error('Tarefa não encontrada.');

    return await prisma.task.update({
      where: { id: taskId },
      data: { done: !task.done },
    });
  },

  delete: async (taskId: number, userId: number) => {
    const task = await prisma.task.findFirst({ where: { id: taskId, userId } });
    if (!task) throw new Error('Tarefa não encontrada.');

    return await prisma.task.delete({ where: { id: taskId } });
  }
};
