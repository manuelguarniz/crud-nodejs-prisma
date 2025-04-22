import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

export const validateBody =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        message: `Datos inválidos`,
        details: result.error.flatten(),
      });
      return;
    }

    req.body = result.data;
    next();
  };
