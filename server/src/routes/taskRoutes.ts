import { Router } from 'express';
import { taskController } from '../controllers/taskController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router.use(authenticateToken); // protege todas as rotas abaixo

router.post('/', taskController.create);
router.get('/', taskController.list);
router.patch('/:id/toggle', taskController.toggleDone);
router.delete('/:id', taskController.delete);

export default router;

/**
 * @swagger
 * tags:
 *   name: Tarefas
 *   description: Endpoints para gerenciamento de tarefas
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Cria uma nova tarefa
 *     tags: [Tarefas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [description, priority]
 *             properties:
 *               description:
 *                 type: string
 *               priority:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tarefa criada
 *       400:
 *         description: Erro ao criar
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Lista tarefas do usuário autenticado
 *     tags: [Tarefas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tarefas
 */

/**
 * @swagger
 * /tasks/{id}/toggle:
 *   patch:
 *     summary: Alterna o status de conclusão da tarefa
 *     tags: [Tarefas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da tarefa
 *     responses:
 *       200:
 *         description: Status alterado
 *       400:
 *         description: Erro
 */

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Exclui uma tarefa
 *     tags: [Tarefas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da tarefa
 *     responses:
 *       204:
 *         description: Excluído com sucesso
 *       400:
 *         description: Erro
 */
