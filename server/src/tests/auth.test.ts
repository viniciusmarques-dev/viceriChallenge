import request from 'supertest';
import app from '../server';

describe('Auth Endpoints', () => {
  let email = `teste${Date.now()}@mail.com`;
  let password = '123456';

  it('Deve registrar um novo usuário', async () => {
    const res = await request(app).post('/auth/register').send({
      name: 'Usuário Teste',
      email,
      password
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('Deve fazer login e retornar um token', async () => {
    const res = await request(app).post('/auth/login').send({
      email,
      password
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
