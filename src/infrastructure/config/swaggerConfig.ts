import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Technical Assessment - Typescript',
      version: '1.0.0',
      description: 'API documentation for the Technical Assessment - Typescript project.',
    },
    servers: [
      {
        url: 'http://localhost:3000/v1',
      },
    ],
  },
  apis: ['./src/infrastructure/routes/*.ts', './src/infrastructure/controllers/*.ts'], // Archivos con anotaciones Swagger
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
