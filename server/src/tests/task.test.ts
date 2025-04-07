import request from 'supertest';
import app from '../server';

describe('Task Endpoints', () => {
  let token: string;
  let taskId: number;

  beforeAll(async () => {
    const email = `user${Date.now()}@mail.com`;
    const password = '123456';

    // Registrar e logar
    await request(app).post('/auth/register').send({
      name: 'Testador',
      email,
      password,
    });

    const login = await request(app).post('/auth/login').send({ email, password });
    token = login.body.token;
  });

  it('Deve criar uma tarefa', async () => {
    const res = await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'Tarefa de teste',
        priority: 'alta',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    taskId = res.body.id;
  });

  it('Deve listar as tarefas', async () => {
    const res = await request(app)
      .get('/tasks')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('Deve alternar o status da tarefa', async () => {
    const res = await request(app)
      .patch(`/tasks/${taskId}/toggle`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.done).toBe(true); // ou false, dependendo do estado anterior
  });

  it('Deve excluir a tarefa', async () => {
    const res = await request(app)
      .delete(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(204);
  });
});
