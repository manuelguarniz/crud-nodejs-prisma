import { Router } from 'express';
import {
  checkExistProduct,
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
  validateProductData,
} from '../controllers/product.controller';

const router = Router();

router.get('/', getProducts);
router.post('/', validateProductData, createProduct);
router.put('/:id', validateProductData, checkExistProduct, updateProduct);
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
router.delete('/:id', validateProductData, checkExistProduct, deleteProduct);

export default router;
