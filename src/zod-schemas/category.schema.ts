import { z } from 'zod';

export const categorySchema = z.object({
  name: z
    .string({ message: 'El nombre es obligatorio' })
    .min(1, { message: 'El nombre no puede ser vacío' }),
});
