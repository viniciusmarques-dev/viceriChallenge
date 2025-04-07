import { Request, Response } from 'express';
import { taskService } from '../services/taskService';

export const taskController = {
  create: async (req: Request, res: Response) => {
    try {
      const { description, priority, userId } = req.body;
      const task = await taskService.create(description, priority, userId);
      res.status(201).json(task);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  list: async (req: Request, res: Response) => {
    try {
      const { userId } = req.body;
      const tasks = await taskService.listByUser(userId);
      res.json(tasks);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  toggleDone: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      const updatedTask = await taskService.toggleDone(Number(id), userId);
      res.json(updatedTask);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      await taskService.delete(Number(id), userId);
      res.status(204).send();
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
};
