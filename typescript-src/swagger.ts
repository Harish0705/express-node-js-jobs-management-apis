import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Jobs Management API',
    version: '1.0.0',
    description: 'A comprehensive API for managing job applications with user authentication',
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      User: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          name: {
            type: 'string',
            minLength: 2,
            maxLength: 100,
            example: 'John Doe',
          },
          email: {
            type: 'string',
            format: 'email',
            example: 'john.doe@example.com',
          },
          password: {
            type: 'string',
            minLength: 10,
            example: 'securePassword123',
          },
        },
      },
      Job: {
        type: 'object',
        required: ['company', 'role'],
        properties: {
          company: {
            type: 'string',
            maxLength: 50,
            example: 'Tech Corp',
          },
          role: {
            type: 'string',
            maxLength: 100,
            example: 'Software Engineer',
          },
          status: {
            type: 'string',
            enum: ['interview', 'declined', 'pending'],
            default: 'pending',
            example: 'pending',
          },
          createdBy: {
            type: 'string',
            example: '507f1f77bcf86cd799439011',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
          },
        },
      },
      Error: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Error message',
          },
        },
      },
    },
  },
};

const options = {
  definition: swaggerDefinition,
  apis: ['./typescript-src/routes/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);