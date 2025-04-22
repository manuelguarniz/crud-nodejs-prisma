jest.mock('../../src/services/category.service.ts');

import request from 'supertest';
import app from '../../src/app';
import * as categoryService from '../../src/services/category.service';

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

    expect(categoryService.getCategories).toHaveBeenCalled();
  });
});

afterEach(() => {
  jest.clearAllMocks();
});
