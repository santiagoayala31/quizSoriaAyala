const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

// Ruta absoluta con "/" para que funcione en Windows y desde cualquier carpeta
const rutas = path.join(__dirname, 'routes', '*.js').replace(/\\/g, '/');

const opciones = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Biblioteca',
      version: '1.0.0',
      description: 'API REST para gestionar los libros de una biblioteca'
    },
    servers: [{ url: '/' }],
    components: {
      schemas: {
        Libro: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            titulo: { type: 'string', example: 'Cien años de soledad' },
            autor: { type: 'string', example: 'Gabriel García Márquez' }
          }
        },
        LibroNuevo: {
          type: 'object',
          required: ['titulo', 'autor'],
          properties: {
            titulo: { type: 'string', example: 'El túnel' },
            autor: { type: 'string', example: 'Ernesto Sabato' }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string', example: 'El título y el autor son obligatorios' }
          }
        }
      }
    }
  },
  apis: [rutas]
};

module.exports = swaggerJsdoc(opciones);
