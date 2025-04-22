import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getProducts = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany({ include: { category: true } });
  res.json(products);
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, categoryId } = req.body;
  const product = await prisma.product.create({
    data: {
      name,
      description,
      price,
      categoryId,
    },
  });
  res.json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, price, categoryId } = req.body;

  const product = await prisma.product.update({
    where: {
      id: Number(id),
    },
    data: {
      name,
      description,
      price,
      categoryId,
    },
  });
  res.json(product);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await prisma.product.findFirst({ where: { id: Number(id) } });
  if (!product) {
    res.status(400).json({ message: `El producto #${id} no existe!` });
    return;
  }
  await prisma.product.delete({ where: { id: Number(id) } });
  res.json({ message: `El producto < ${product.name} > (#${id}) ha sido eliminado!` });
};
