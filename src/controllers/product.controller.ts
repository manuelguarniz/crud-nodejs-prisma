import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { productSchema, productSchemaUpdate } from '../schemas/product.schema';

const prisma = new PrismaClient();

export const getProducts = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany({ include: { category: true } });
  res.json(products);
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, categoryId } = req.body;

  try {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        categoryId,
      },
    });
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Error al crear el producto.`,
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  let product = await prisma.product.findFirst({ where: { id: Number(id) } });
  if (!product) {
    res.status(400).json({ message: `El producto #${id} no existe!` });
    return;
  }

  const data = req.body;

  try {
    product = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data,
    });
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Error al actualizar el producto.`,
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await prisma.product.findFirst({ where: { id: Number(id) } });
  if (!product) {
    res.status(400).json({ message: `El producto #${id} no existe!` });
    return;
  }
  try {
    await prisma.product.delete({ where: { id: Number(id) } });
    res.json({ message: `El producto < ${product.name} > (#${id}) ha sido eliminado!` });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Error al eliminar  el producto.`,
    });
  }
};
