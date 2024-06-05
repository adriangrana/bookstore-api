import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hexagonal Architecture Project API',
      version: '1.0.0',
      description: 'API documentation for the Hexagonal Architecture Project',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
  },
  apis: ['./src/infrastructure/routes/*.ts', './src/infrastructure/controllers/*.ts'], // Archivos con anotaciones Swagger
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
