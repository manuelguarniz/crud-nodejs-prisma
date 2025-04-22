import express from 'express';
import swaggerConfig from './config/swagger';
import swaggerDocument from './docs/swagger.json';
import categoryRoutes from './routes/category.routes';
import productRoutes from './routes/product.routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', ...swaggerConfig);

app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);

export default app;
