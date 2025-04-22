import { z } from 'zod';

export const productSchema = z.object({
  name: z
    .string({ message: 'El nombre es obligatorio' })
    .min(1, { message: 'El nombre no puede ser vacío' }),
  price: z
    .number({ message: 'El precio es obligatorio' })
    .positive({ message: 'El precio debe ser positivo' }),
  categoryId: z
    .number({ message: 'Categoria es obligatorio' })
    .int()
    .positive({ message: 'Categoria inválida' }),
});

export const productSchemaUpdate = productSchema.partial();
