import { db } from '../config/db';
import { TCategoryProductRead, TCategoryRead } from '../models/general.model';

export const getCategories = async (): Promise<TCategoryRead[]> => {
  return await db.category.findMany({ select: { id: true, name: true } });
};

export const getCategoriesWithProducts = async (): Promise<TCategoryProductRead[]> => {
  return await db.category.findMany({
    select: {
      id: true,
      name: true,
      products: {
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
        },
      },
    },
  });
};

export const createCategory = async (name: string): Promise<TCategoryRead> => {
  return await db.category.create({
    data: {
      name,
    },
  });
};

export const findCategoryById = async (id: number): Promise<TCategoryRead> => {
  return await db.category.findFirstOrThrow({ where: { id } });
};

export const findCategoryByName = async (name: string): Promise<TCategoryRead | null> => {
  return await db.category.findFirst({
    where: { name: { equals: name, mode: 'insensitive' } },
  });
};
