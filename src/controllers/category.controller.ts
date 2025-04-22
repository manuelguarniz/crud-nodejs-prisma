import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { categorySchema } from '../schemas/category.schema';

const prisma = new PrismaClient();

export const getCategories = async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
};

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const category = await prisma.category.create({
      data: {
        name,
      },
    });
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Error al crear la categoria.`,
    });
  }
};
