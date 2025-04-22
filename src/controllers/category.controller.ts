import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { categorySchema } from '../zod-schemas/category.schema';
import {
  sendDuplicateError,
  sendNotFoundResponse,
  sendSuccessResponse,
} from '../utils/response-handler';

const prisma = new PrismaClient();

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  const categories = await prisma.category.findMany();
  sendSuccessResponse(res, categories);
  next();
};

export const validateCategoryData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    categorySchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export const checkDuplicateCategory = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  try {
    const existCategory = await prisma.category.findFirst({
      where: { name: { equals: name, mode: 'insensitive' } },
    });
    if (existCategory) {
      sendDuplicateError(res, `La cagoria con el nombre < ${name} > ya éxiste!`);
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
};
export const checkExistCategory = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.query.id;
  try {
    const existCategory = await prisma.category.findFirst({
      where: { id: Number(id) },
    });
    if (!existCategory) {
      sendNotFoundResponse(res, `La categoria #${id} no éxiste!`);
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.query.id;
  try {
    const category = await prisma.category.findFirst({ where: { id: Number(id) } });
    sendSuccessResponse(res, category);
    next();
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  try {
    const category = await prisma.category.create({
      data: {
        name,
      },
    });
    sendSuccessResponse(res, category);
    next();
  } catch (error) {
    next(error);
  }
};
