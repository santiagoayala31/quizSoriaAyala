# Biblioteca — Quiz Servicios Web y Frontend

API REST (Node.js + Express) y frontend (React + Vite) para gestionar libros.

## Estructura

```
biblioteca/
├── backend/    API REST con Express, Swagger y CORS
└── frontend/   React (Vite) con CSS propio
```

## Cómo correrlo (forma rápida)

Desde la carpeta `biblioteca` (la que tiene este README):

```bash
npm install     # instala raíz, backend y frontend
npm run dev     # levanta API y frontend juntos
```

- Frontend: http://localhost:5173
- API: http://localhost:3000/api/libros
- Swagger UI: http://localhost:3000/api-docs

## Cómo correrlo (por separado, dos terminales)

```bash
cd backend
npm install
npm start
```

```bash
cd frontend
npm install
npm run dev
```

## Endpoints

| Método | Ruta | Respuesta |
|---|---|---|
| GET | /api/libros | 200 con la lista |
| POST | /api/libros | 201 creado · 400 si falta título o autor |
| DELETE | /api/libros/{id} | 204 eliminado · 404 si no existe |

Los datos están en memoria. CORS habilitado.

## Problemas comunes en Windows

- **"la ejecución de scripts está deshabilitada"** en PowerShell: usa la terminal **cmd** o ejecuta una vez
  `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.
- **"El puerto 3000 ya está en uso"**: cierra el otro proyecto que esté corriendo.
- **"Could not read package.json"**: estás en la carpeta equivocada; entra a `biblioteca`.
- Requiere Node.js 18 o superior (`node -v`).
