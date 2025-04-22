export const db = {
  category: {
    findMany: jest.fn(() =>
      Promise.resolve([
        { id: 1, name: 'demo1' },
        { id: 2, name: 'demo2' },
        { id: 3, name: 'demo3' },
      ]),
    ),
  },
};
