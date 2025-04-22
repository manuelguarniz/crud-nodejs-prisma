import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { productSchema, productSchemaUpdate } from '../zod-schemas/product.schema';
import { sendNotFoundResponse, sendSuccessResponse } from '../utils/response-handler';

const prisma = new PrismaClient();

export const checkExistProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    let product = await prisma.product.findFirst({ where: { id: Number(id) } });
    if (!product) {
      sendNotFoundResponse(res, `El producto #${id} no existe!`);
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const validateProductData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    productSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export const validateOptionalProductData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    productSchemaUpdate.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await prisma.product.findMany({ include: { category: true } });
    sendSuccessResponse(res, products);
    next();
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
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
    sendSuccessResponse(res, product);
    next();
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const product = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data,
    });
    sendSuccessResponse(res, product);
    next();
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({ where: { id: Number(id) } });
    sendSuccessResponse(res, `El producto #${id} ha sido eliminado!`);
    next();
  } catch (error) {
    next(error);
  }
};
