import request from 'supertest';
import app from './../../../src/app';

describe('GET /api/category', () => {
  it('devuelve 3 categorias', async () => {
    const res = await request(app).get('/api/category');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        id: 1,
        name: 'demo',
      },
      {
        id: 2,
        name: 'comestibles',
      },
    ]);
  });
});

afterEach(() => {
  jest.clearAllMocks();
});
