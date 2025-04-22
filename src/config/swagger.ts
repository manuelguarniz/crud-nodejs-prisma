import swaggerUI from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Productos y Categorías',
      version: '1.0.0',
      description: 'Documentación de la API REST con Express y Prisma',
    },
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export default [swaggerUI.serve, swaggerUI.setup(swaggerDocs)];
