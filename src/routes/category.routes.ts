import { Router } from 'express';
import { createCategory, getCategories } from '../controllers/category.controller';
import { validateBody } from '../middleware/validate.middleware';
import { categorySchema } from '../schemas/category.schema';

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
router.post('/', validateBody(categorySchema), createCategory);

export default router;
