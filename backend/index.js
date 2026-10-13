const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const librosRouter = require('./routes/libros');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS habilitado para que el frontend pueda consumir la API
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/libros', librosRouter);

// Documentación Swagger/OpenAPI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/api-docs.json', (req, res) => res.json(swaggerSpec));

// JSON mal formado -> 400
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'JSON inválido' });
  }
  next(err);
});

const server = app.listen(PORT, () => {
  console.log(`API en http://localhost:${PORT}/api/libros`);
  console.log(`Swagger en http://localhost:${PORT}/api-docs`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`El puerto ${PORT} ya está en uso. Cierra el otro proceso o cambia el puerto.`);
  } else {
    console.error(err);
  }
  process.exit(1);
});
