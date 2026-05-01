# Taller de Node.js — Sistema de gestión de empleados

API REST desarrollada con Express.js para la administración de empleados de **Taller de Node.js S.A. de C.V.**, con autenticación JWT y control de acceso para administradores.

**Autores:** Diego Alejandro Lugo Coronel, Noe Alvarez

---

## Requisitos previos

- Node.js v18 o superior
- MySQL
- npm

---

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Creepty07/taller-node-js-crud-system.git
cd taller-node-js-crud-system

# Instalar dependencias
npm install
```

---

## Configuración

1. Crea un archivo `.env` en la raíz del proyecto basándote en `.env.example`:

```env
PORT=3000
```

2. Configura tu base de datos MySQL. En `db/database.js` están los parámetros de conexión:

```
Host:     localhost
Usuario:  root
Base de datos: empleados
```

3. Crea la base de datos y la tabla necesaria:

```sql
CREATE DATABASE empleados;

USE empleados;

CREATE TABLE empleados (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    direccion VARCHAR(255) NOT NULL
);
```

---

## Uso

```bash
npm start
```

El servidor corre en `http://localhost:3000`

---

## Endpoints

### General

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/` | Mensaje de bienvenida |
| `GET` | `/login` | Sirve la página de inicio de sesión |

### Empleados — `/empleados`

| Método | Ruta | Descripción | Body requerido |
|--------|------|-------------|----------------|
| `GET` | `/empleados` | Obtener todos los empleados | — |
| `GET` | `/empleados/:nombre` | Buscar empleado por nombre | — |
| `POST` | `/empleados` | Agregar un nuevo empleado | `nombre`, `apellidos`, `telefono`, `correo`, `direccion` |
| `PUT` | `/empleados` | Modificar datos de un empleado | `id`, `nombre`, `apellidos`, `telefono`, `correo`, `direccion` |
| `DELETE` | `/empleados` | Eliminar un empleado | `id` o (`nombre` + `apellidos`) |

---

## Estructura del proyecto

```
taller-node-js-crud-system/
├── db/
│   └── database.js       # Configuración y conexión a MySQL
├── public/
│   └── login.html        # Frontend del login
├── routes/
│   └── empleados.js      # Rutas del CRUD de empleados
├── .env.example
├── .gitignore
├── index.js              # Punto de entrada del servidor
└── package.json
```

---

## Dependencias

| Paquete | Versión | Uso |
|---------|---------|-----|
| express | ^5.2.1 | Framework web |
| mysql | ^2.18.1 | Conexión a base de datos |
| dotenv | ^17.4.2 | Variables de entorno |
| morgan | ^1.10.1 | Logger de peticiones HTTP |
| jsonwebtoken | ^9.0.3 | Autenticación JWT |
| nodemon | ^3.1.14 | Recarga automática en desarrollo |

---

## Licencia

ISC