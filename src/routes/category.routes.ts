import { Router } from 'express';
import {
  checkDuplicateCategory,
  checkExistCategory,
  createCategory,
  getCategories,
  getCategoryById,
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
router.get('/search', checkExistCategory, getCategoryById);
router.post('/', validateCategoryData, checkDuplicateCategory, createCategory);

export default router;
