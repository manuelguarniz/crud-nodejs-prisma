import { Category, Product } from '@prisma/client';

export type TCategoryRead = Omit<Category, 'products'>;
export type TCategoryProductRead = Pick<Category, 'id' | 'name'> & { products: TProductRead[] };
export type TProductRead = Pick<Product, 'id' | 'name' | 'description' | 'price'>;
