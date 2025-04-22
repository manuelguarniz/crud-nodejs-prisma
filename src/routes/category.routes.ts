import { Router } from 'express';
import { createCategory, getCategories } from '../controllers/category.controller';
import { validateBody } from '../middleware/validate';
import { categorySchema } from '../schemas/category.schema';

const router = Router();

router.get('/', getCategories);
router.post('/', validateBody(categorySchema), createCategory);

export default router;
