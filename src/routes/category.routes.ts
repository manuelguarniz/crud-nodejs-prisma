import { Router } from 'express';
import {
  checkDuplicateCategory,
  createCategory,
  getCategories,
  validateCategoryData,
} from '../controllers/category.controller';

const router = Router();

/**
 * @swagger
 * /api/category/:
 *  get:
 *    summary: Listar las categorias
 *    responses:
 *      200:
 *        description: lista todas las categorias
 * @param req
 * @param res
 */
router.get('/', getCategories);
router.post('/', validateCategoryData, checkDuplicateCategory, createCategory);

export default router;
