import express, { Request, Response } from 'express';
import categoryRoutes from './routes/category.routes';
import productRoutes from './routes/product.routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);

export default app;
