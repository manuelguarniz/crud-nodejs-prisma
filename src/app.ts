import express from 'express';
import swaggerConfig from './config/swagger';
import categoryRoutes from './routes/category.routes';
import productRoutes from './routes/product.routes';
import { errorHandler } from './middlewares/error-handler';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', ...swaggerConfig);

app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);

app.use(errorHandler);

export default app;
