# ProyectoFinalPokemon
# BACK
# PokéAPI - Backend
PokéAPI es una API RESTful para gestionar equipos, Pokémon, combates y estadísticas en un entorno competitivo inspirado en el universo Pokémon. Este backend está desarrollado con Node.js, Express y Sequelize sobre MySQL.

---

## 🚀 Características Principales

- 🔐 **Autenticación JWT:** Registro y login de usuarios.
- 👥 **Gestión de equipos:** Crear, editar, eliminar y consultar equipos de 4 Pokémon.
- 🐱‍👓 **Gestión de Pokémon:** CRUD completo para administradores.
- 🌈 **Asignación de tipos:** Relaciona Pokémon con sus tipos.
- ⚔️ **Sistema de combates:** Inicia combates entre equipos, registra rondas y determina ganadores.
- 📊 **Historial y estadísticas:** Consulta historial de combates y ranking global.
- 🛡️ **Panel de administración:** Gestión avanzada de usuarios, equipos y combates (solo root).
- 🧪 **Cobertura de tests:** Tests automáticos con Jest y Supertest.

---

## 🛠️ Tecnologías Utilizadas

| Nombre         | Descripción                |
| -------------- | ------------------------- |
| Node.js        | Backend JavaScript        |
| Express        | Framework API RESTful     |
| Sequelize      | ORM para MySQL            |
| MySQL          | Base de datos relacional  |
| JWT            | Autenticación segura      |
| Jest & Supertest | Testing automático      |

---

## ⚡ Instalación Rápida

```bash
git clone https://github.com/sergioalos/ProyectoFinalPokemon.git
cd PokeApi
npm install
```

---

### 1️⃣ Configuración de variables de entorno

Crea un archivo `.env` en la raíz con estos valores de ejemplo:

```properties
DB_HOST=localhost
DB_PORT=3306
DB_NAME=pokeapi
DB_USER=root
DB_PASS=pokemon123
JWT_SECRET=g2R@Z6y!uP04$XmAj1F*vm7cK2LwLQ93
```

---

### 2️⃣ Base de datos MySQL

- Instala MySQL Server y Workbench.
- Crea la base de datos `pokeapi`.
- Importa el dump desde: **SERVER → DATA IMPORT**.
- Puerto por defecto: `3306`.
- Usuario: `root`.
- Contraseña de ejemplo: `pokemon123`.

---

### 3️⃣ Arranca el servidor

```bash
npm run dev
```

---

## 📚 Endpoints Principales

<details>
  <summary><b>Autenticación</b></summary>

  - `POST /auth/register` — Registro de usuario
  - `POST /auth/login` — Login y obtención de token JWT
</details>

<details>
  <summary><b>Equipos</b></summary>

  - `POST /teams` — Crear equipo
  - `GET /teams/my` — Ver equipos propios
  - `PUT /teams/:id` — Editar equipo
  - `DELETE /teams/:id` — Eliminar equipo
</details>

<details>
  <summary><b>Pokémon</b></summary>

  - `GET /pokemons` — Listar Pokémon
  - `POST /pokemons` — Crear Pokémon (root)
  - `PUT /pokemons/:id` — Editar Pokémon (root)
  - `DELETE /pokemons/:id` — Eliminar Pokémon (root)
</details>

<details>
  <summary><b>Tipos y efectividad</b></summary>

  - `GET /types` — Listar tipos
  - `POST /effectiveness` — Crear relación de efectividad (root)
</details>

<details>
  <summary><b>Combates</b></summary>

  - `POST /battles` — Iniciar combate
  - `POST /battles/:id/rounds` — Iniciar ronda
  - `GET /battles/my-history` — Ver historial de combates
</details>

<details>
  <summary><b>Estadísticas</b></summary>

  - `GET /stats/ranking` — Ranking global
  - `GET /stats/my-stats` — Estadísticas propias
</details>

<details>
  <summary><b>Administración (solo root)</b></summary>

  - `GET /admin/users` — Listar usuarios
  - `DELETE /admin/users/:id` — Eliminar usuario
  - `GET /admin/teams` — Listar todos los equipos
  - `GET /admin/battles` — Listar todos los combates
</details>

---

## 🧪 Testing

Ejecuta los tests automáticos con cobertura:

```bash
npm test
```

---

## 🗂️ Estructura del Proyecto

```
src/
 ├── app.js
 ├── routes/
 ├── models/
 ├── middleware/
 ├── utils/
 ├── config/
 └── ...
```

---

## 👤 Contacto

Desarrollado por: **Sergio**  
📧 Email: enderman838@gmail.com

---

## 🗝️ Usuarios de ejemplo

```json
{
  "email": "root@pokeapi.com",
  "password": "rootpassword"
}
```

---

# FRONT

# Pokeworld - Frontend

Interfaz web profesional construida con React y Vite para interactuar con la API REST de PokéAPI. Permite a los usuarios:

- Registrarse e iniciar sesión
- Gestionar equipos Pokémon
- Participar en combates automáticos
- Visualizar historial de batallas, estadísticas y rankings
- Navegar por la lista de Pokémon y detalles de equipos

---

## 📁 Estructura del proyecto

```
├── public/
│   ├── vite.svg
├── src/
│   ├── App.jsx, App.css, index.css, main.jsx, setupTests.js
│   ├── api/           # Módulos para interacción con la API (auth, battles, pokemon, teams, teampokemons)
│   ├── assets/
│   │   ├── react.svg
│   │   ├── css/       # Estilos CSS por componente/página
│   │   └── images/    # Imágenes utilizadas en la interfaz
│   ├── components/    # Componentes reutilizables (Navbar, PrivateRoute)
│   ├── context/       # Contexto global (AuthContext)
│   ├── hooks/         # Custom hooks (por implementar)
│   ├── pages/         # Páginas principales (Home, Login, Register, Teams, Battle, Ranking, etc.)
│   │   └── __tests__/ # Pruebas unitarias de páginas
│   ├── test/          # Configuración de pruebas
│   └── utils/         # Utilidades (auth)
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
├── README.md
```

---

## 🚀 Tecnologías utilizadas

- [React](https://reactjs.org/) - Librería principal para la interfaz
- [Vite](https://vitejs.dev/) - Bundler y servidor de desarrollo
- [React Router](https://reactrouter.com/) - Navegación entre páginas
- [Axios](https://axios-http.com/) - Cliente HTTP para la API
- [Vitest](https://vitest.dev/) / [Jest](https://jestjs.io/) - Pruebas unitarias
- [ESLint](https://eslint.org/) - Linter para calidad de código
- [Chakra UI](https://chakra-ui.com/) *(opcional, si se usó)*

---

## 🧩 Funcionalidades principales

- **Autenticación:** Registro, login y rutas privadas
- **Gestión de equipos Pokémon:** Crear, editar, eliminar y visualizar equipos
- **Combates automáticos:** Iniciar y visualizar batallas entre equipos
- **Historial y ranking:** Consulta de batallas previas y ranking de usuarios
- **Listado de Pokémon:** Navegación y detalles de Pokémon disponibles
- **Interfaz responsiva y moderna**
- **Pruebas unitarias:** Cobertura de componentes y páginas principales

---

## � Instalación y ejecución

1. Clona el repositorio y accede a la carpeta del frontend:

```bash
si no lo has instalado aun 
git clone https://github.com/sergioalos/ProyectoFinalPokemon.git
cd PokeWorld
```

2. Instala las dependencias:

```bash
npm install
```

3. Inicia el servidor de desarrollo:

```bash
npm run dev
```

4. Ejecuta las pruebas:

```bash
npx vitest run
```

---

## 🗂️ Estructura de carpetas clave

- **src/api/**: Lógica de comunicación con la API REST
- **src/components/**: Componentes reutilizables
- **src/pages/**: Vistas principales de la aplicación
- **src/context/**: Contextos globales (ej. autenticación)
- **src/assets/**: Imágenes y estilos
- **src/utils/**: Funciones auxiliares
- **src/pages/__tests__/**: Pruebas unitarias de páginas

---

## 🧪 Pruebas

El proyecto incluye pruebas unitarias para los principales componentes y páginas usando Vitest/Jest. Para ejecutarlas:

```bash
npx vitest run
```

## 👨‍💻 Autor

Desarrollado por Sergio Alós

---

