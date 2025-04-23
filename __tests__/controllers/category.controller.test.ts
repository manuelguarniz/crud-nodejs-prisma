jest.mock('../../src/services/category.service', () => ({
  getCategories: jest.fn(),
}));

import request from 'supertest';
import app from '../../src/app';
import * as categoryService from '../../src/services/category.service';

describe('GET /api/category', () => {
  it('devuelve 3 categorias', async () => {
    const mockCategories = [
      {
        id: 1,
        name: 'demo',
      },
      {
        id: 2,
        name: 'comestibles',
      },
    ];
    (categoryService.getCategories as jest.Mock).mockResolvedValue(mockCategories);

    const res: any = await request(app).get('/api/category');

    const expectedResponse = {
      success: true,
      data: [
        {
          id: 1,
          name: 'demo',
        },
        {
          id: 2,
          name: 'comestibles',
        },
      ],
    };

    expect(res.status).toBe(200);
    expect(res.body).toEqual(expectedResponse);

    expect(categoryService.getCategories).toHaveBeenCalled();
  });
});

afterEach(() => {
  jest.clearAllMocks();
});
