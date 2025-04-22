import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from '../controllers/product.controller';
import { validateBody } from '../middleware/validate';
import { productSchema, productSchemaUpdate } from '../schemas/product.schema';

const router = Router();

router.get('/', getProducts);
router.post('/', validateBody(productSchema), createProduct);
router.put('/:id', validateBody(productSchemaUpdate), updateProduct);
router.delete('/:id', deleteProduct);

export default router;
