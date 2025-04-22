import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from '../controllers/product.controller';
import { validateBody } from '../middleware/validate.middleware';
import { productSchema, productSchemaUpdate } from '../schemas/product.schema';

const router = Router();

router.get('/', getProducts);
router.post('/', validateBody(productSchema), createProduct);
router.put('/:id', validateBody(productSchemaUpdate), updateProduct);
/**
 * @swagger
 * /api/product/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     description: Elimina un producto con el id
 *     parameters:
 *       - in: path
 *         name: id
 *         type: integer
 *         required: true
 *         description: Valor númerico que representa el ID del producto
 *     responses:
 *       200:
 *         description: Elimina con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de respuesta
 *                   example: El producto demo (#2) ha sido eliminado!
 */
router.delete('/:id', deleteProduct);

export default router;
