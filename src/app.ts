import express, { Response } from 'express';
import swaggerConfig from './config/swagger';
import categoryRoutes from './routes/category.routes';
import productRoutes from './routes/product.routes';
import { errorHandler } from './middlewares/error-handler';
import pino from 'pino';
import loggerConfig from './config/logger.config';

export const logger = pino({ name: 'server start' });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(loggerConfig);
// app.use(
//   pinoHttp({
//     logger,
//     redact: ['req.body.password', 'req.headers.authorization'], // <-- oculta campos sensibles
//     customLogLevel: (res: Response, err) => {
//       if (res.statusCode >= 500 || err) return 'error';
//       if (res.statusCode >= 400) return 'warn';
//       return 'info';
//     },
//   }),
// );

app.use('/api-docs', ...swaggerConfig);

app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);

app.use(errorHandler);

export default app;
