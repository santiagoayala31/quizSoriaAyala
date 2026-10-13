import { useEffect, useState } from 'react';
import './App.css';

const API = 'http://localhost:3000/api/libros';

export default function App() {
  const [libros, setLibros] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [error, setError] = useState('');

  // GET: cargar la lista
  const cargarLibros = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setLibros(data);
      setError('');
    } catch {
      setError('No se pudo conectar con la API. ¿Está corriendo el backend?');
    }
  };

  useEffect(() => {
    cargarLibros();
  }, []);

  // POST: crear un libro
  const crearLibro = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, autor })
      });

      if (res.status === 201) {
        setTitulo('');
        setAutor('');
        setError('');
        cargarLibros();
      } else {
        const data = await res.json();
        setError(data.error || 'Error al crear el libro');
      }
    } catch {
      setError('No se pudo conectar con la API');
    }
  };

  // DELETE: eliminar un libro
  const eliminarLibro = async (id) => {
    try {
      const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
      if (res.status === 204) {
        cargarLibros();
      } else {
        const data = await res.json();
        setError(data.error || 'Error al eliminar el libro');
      }
    } catch {
      setError('No se pudo conectar con la API');
    }
  };

  return (
    <div className="contenedor">
      <h1>📚 Biblioteca</h1>

      {/* Formulario con inputs controlados */}
      <form className="formulario" onSubmit={crearLibro}>
        <h2>Agregar libro</h2>
        <div className="campos">
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <input
            type="text"
            placeholder="Autor"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
          />
          <button type="submit" className="btn-agregar">
            Agregar
          </button>
        </div>
      </form>

      {error && <div className="alerta">{error}</div>}

      {/* Lista de libros */}
      {libros.length === 0 ? (
        <p className="vacio">No hay libros registrados.</p>
      ) : (
        <ul className="lista">
          {libros.map((libro) => (
            <li className="libro" key={libro.id}>
              <h3>{libro.titulo}</h3>
              <p>{libro.autor}</p>
              <small>ID: {libro.id}</small>
              <button className="btn-eliminar" onClick={() => eliminarLibro(libro.id)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
