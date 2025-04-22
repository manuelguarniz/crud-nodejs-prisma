// jest.mock('../../src/config/db', () => ({
//   db: {
//     category: {
//       findMany: jest.fn(),
//     },
//   },
// }));
jest.mock('../../src/config/db');
import * as categoryService from '../../src/services/category.service';
import { db } from '../../src/config/db';

describe('get category service', () => {
  it('traer todos los productos', async () => {
    // (db.category.findMany as jest.Mock).mockResolvedValue([
    //   { id: 1, name: 'demo1' },
    //   { id: 2, name: 'demo2' },
    //   { id: 3, name: 'demo3' },
    // ]);
    const data = await categoryService.getCategories();

    expect(data).toEqual([
      { id: 1, name: 'demo1' },
      { id: 2, name: 'demo2' },
      { id: 3, name: 'demo3' },
    ]);
    expect(db.category.findMany).toHaveBeenCalled();
  });
});
