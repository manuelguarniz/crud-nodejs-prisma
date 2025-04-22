import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { categorySchema } from '../zod-schemas/category.schema';
import {
  sendDuplicateError,
  sendNotFoundResponse,
  sendSuccessResponse,
} from '../utils/response-handler';
import * as categoryService from '../services/category.service';

export const validateCategoryData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    categorySchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  const { include, id } = req.query;
  let categories;
  if (include && include === 'products') {
    categories = await categoryService.getCategoriesWithProducts();
  } else if (id && !isNaN(Number(id))) {
    categories = [await categoryService.findCategoryById(Number(id))];
  } else {
    categories = await categoryService.getCategories();
  }
  sendSuccessResponse(res, categories);
  next();
};

export const checkDuplicateCategory = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  try {
    const existCategory = await categoryService.findCategoryByName(name);
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
    const existCategory = await categoryService.findCategoryById(Number(id));
    if (!existCategory) {
      sendNotFoundResponse(res, `La categoria #${id} no éxiste!`);
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  try {
    const category = await categoryService.createCategory(name);
    sendSuccessResponse(res, category);
    next();
  } catch (error) {
    next(error);
  }
};
