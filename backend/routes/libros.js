const express = require('express');
const router = express.Router();

// Datos en memoria
let libros = [
  { id: 1, titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez' },
  { id: 2, titulo: 'La vorágine', autor: 'José Eustasio Rivera' },
  { id: 3, titulo: 'Don Quijote de la Mancha', autor: 'Miguel de Cervantes' }
];
let siguienteId = 4;

/**
 * @openapi
 * /api/libros:
 *   get:
 *     summary: Lista todos los libros
 *     tags: [Libros]
 *     responses:
 *       200:
 *         description: Lista de libros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Libro'
 */
router.get('/', (req, res) => {
  res.status(200).json(libros);
});

/**
 * @openapi
 * /api/libros:
 *   post:
 *     summary: Crea un libro nuevo
 *     tags: [Libros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LibroNuevo'
 *     responses:
 *       201:
 *         description: Libro creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Libro'
 *       400:
 *         description: Falta el título o el autor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', (req, res) => {
  const { titulo, autor } = req.body || {};
  const tituloOk = typeof titulo === 'string' && titulo.trim() !== '';
  const autorOk = typeof autor === 'string' && autor.trim() !== '';

  if (!tituloOk || !autorOk) {
    return res.status(400).json({ error: 'El título y el autor son obligatorios' });
  }

  const nuevo = { id: siguienteId++, titulo: titulo.trim(), autor: autor.trim() };
  libros.push(nuevo);
  res.status(201).json(nuevo);
});

/**
 * @openapi
 * /api/libros/{id}:
 *   delete:
 *     summary: Elimina un libro por id
 *     tags: [Libros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id del libro
 *     responses:
 *       204:
 *         description: Libro eliminado
 *       404:
 *         description: El libro no existe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const indice = libros.findIndex((l) => l.id === id);

  if (indice === -1) {
    return res.status(404).json({ error: 'Libro no encontrado' });
  }

  libros.splice(indice, 1);
  res.status(204).send();
});

module.exports = router;
