# Nexbyte v5 — Tienda virtual con Panel Administrador (E2)
================================================================

Proyecto académico que integra frontend **React** y backend **Spring Boot** para la administración de una tienda virtual (perfil Administrador).

La entrega E2 abarca: servicios REST, UI en React, integración FE/BE, base de datos relacional + seed, validaciones y control de versiones con Git/GitHub, más autenticación y sesión simple (sin JWT), Swagger y tests con JUnit/Mockito.

---

## Tabla de contenido
------------------
1) Tecnologías
2) Arquitectura
3) Requisitos previos
4) Instalación y ejecución
   4.1) Backend (Spring Boot)
   4.2) Frontend (React + Vite)
5) Base de datos y seed
6) Autenticación y sesión (sin JWT)
7) Documentación de API
8) Testing
9) Estructura de repositorio y ramas
10) Credenciales de prueba
11) Matriz de cumplimiento (rúbrica E2)
12) Plan de demo (15 minutos)
13) Licencia

---

## 💻 1) Tecnologías
--------------
### Backend
* Java 17
* Spring Boot 3 (Spring Web, Spring Validation, Spring Data JPA)
* Hibernate
* MySQL 8.x
* Swagger / OpenAPI (springdoc)
* JUnit 5 + Mockito

### Frontend
* React 18
* Vite
* React Router
* Axios / Fetch
* CSS responsivo, validación en tiempo real y feedback visual

---

## 🏗️ 2) Arquitectura
---------------
* **Flujo principal:** `React (Vite/Router) ⇄ API REST Spring Boot ⇄ MySQL`
* **Capas backend:** Controller → Service → Repository → Entity/DTO
* **Estándares:** REST JSON, Bean Validation, Manejador global de excepciones

---

## 🛠️ 3) Requisitos previos
---------------------
* Java 17 y Maven 3.9+
* Node 18+ y npm (o pnpm/yarn)
* MySQL 8.x (con un cliente como DBeaver, DataGrip o Workbench)

---

## 🚀 4) Instalación y ejecución
--------------------------

### 4.1) Backend (Spring Boot)

1.  **Configura** `application.properties` (o `application.yml`):

    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/nexbyte?useSSL=false&serverTimezone=UTC
    spring.datasource.username=usuario
    spring.datasource.password=clave
    spring.jpa.hibernate.ddl-auto=update
    spring.jpa.show-sql=false

    # Opcional para rutas personalizadas de Swagger:
    # springdoc.swagger-ui.path=/swagger-ui.html
    # springdoc.api-docs.path=/v3/api-docs
    ```

2.  **Ejecuta:**

    ```bash
    mvn clean spring-boot:run
    ```

3.  **API por defecto:** `http://localhost:8080/`

4.  **Endpoints principales (resumen):**

    * **Usuarios:**
        * `GET /api/usuarios`
        * `GET /api/usuarios/{id}`
        * `POST /api/usuarios`
        * `PUT /api/usuarios/{id}`
        * `PATCH /api/usuarios/{id}/estado` (inhabilitar/activar; sin borrado físico)
        * Filtros y paginación: `/api/usuarios?nombre=ana&email=@gmail.com&rol=VENDEDOR&estado=ACTIVO&page=0&size=10&sort=nombre,asc`

    * **Productos:**
        * `GET /api/productos`
        * `GET /api/productos/{id}`
        * `POST /api/productos`
        * `PUT /api/productos/{id}`
        * `PATCH /api/productos/{id}/estado` (inhabilitar/activar)
        * Filtros: `/api/productos?nombre=asus&categoriaId=3`
        * Stock crítico: `GET /api/productos/criticos` (o `GET /api/productos?umbral=5`)

    * **Categorías:**
        * `GET/POST/PUT/DELETE /api/categorias` (sin borrar si tiene productos asociados)

    * **Autenticación simple (sin JWT en E2):**
        * `POST /api/auth/login` → valida credenciales en BD y retorna datos del usuario autenticado

### 4.2) Frontend (React + Vite)

1.  **Configura** la URL de la API en `.env` (en la raíz del frontend):

    ```ini
    VITE_API_BASE_URL=http://localhost:8080
    ```

2.  **Instala y ejecuta:**

    ```bash
    # Instalar dependencias
    npm install
    
    # Iniciar servidor de desarrollo
    npm run dev
    
    # Build de producción (opcional)
    # npm run build
    ```

3.  **App por defecto:** `http://localhost:5173/`

4.  **Características clave FE:**
    * Migración de templates a **componentes reutilizables** (Navbar, Footer, ProductCard, Grid).
    * **Módulo Usuarios:** tabla responsive, crear/editar, inhabilitar/activar, búsqueda/filtrado.
    * **Módulo Productos:** lista con imágenes, subida de imagen o URL, búsqueda por nombre y filtro por categoría.
    * **Dashboard:** KPIs (total productos, total usuarios, stock < 5), accesos rápidos.
    * Validaciones en tiempo real, mensajes claros, feedback visual.
    * **Rutas protegidas** para panel Admin (guard/ProtectedRoute).

---

## 🗃️ 5) Base de datos y seed
-----------------------
* Script de poblamiento SQL con:
    * ≥ 1 usuario **administrador** por defecto
    * ≥ 5 categorías
    * ≥ 15 productos con datos realistas (nombre, descripción, precio, stock, categoría, imagen/URL, estado, fecha de creación)
* Ejecuta el script de seed antes de iniciar (o configura `data.sql`/cargador inicial en el backend).

---

## 🔒 6) Autenticación y sesión (sin JWT)
-----------------------------------
* **Login:** `POST /api/auth/login` valida credenciales en BD y retorna datos del usuario autenticado (sin JWT en E2).
* **Rol Admin:** verificación en backend y restricción de acceso al panel en frontend.
* **Sesión simple en FE:** persistencia mínima (ej. `localStorage`), redirección a dashboard tras login y logout.

---

## 📚 7) Documentación de API
-----------------------
* **Swagger UI:** `http://localhost:8080/swagger-ui/index.html`
* **OpenAPI JSON:** `http://localhost:8080/v3/api-docs`
* **(Opcional)** Colección Postman en: `/docs/postman/Nexbyte.postman_collection.json`

---

## 🧪 8) Testing
----------
* **Stack:** JUnit 5 + Mockito
    * **ProductoService:** 3–4 tests (crear, actualizar, listar, stock crítico)
    * **UsuarioService:** 2–3 tests (crear, actualizar/inhabilitar, findByEmail)
* **Ejecutar tests:**
    ```bash
    mvn -q test
    ```
* **(Opcional)** Integrar Jacoco para cobertura de código.

---

## 📂 9) Estructura de repositorio y ramas
------------------------------------
* Repos separados o monorepo con carpetas `/backend` y `/frontend`.
* **Ramas requeridas:** `backend` y `frontend` (o `main`/`master` si es monorepo).
* Commits descriptivos y frecuentes.
* `.gitignore` configurado (ej.: `node_modules/`, `target/`, `.env`).

---

## 🔑 10) Credenciales de prueba
--------------------------
*(Actualiza con las reales del seed antes de compartir el repo)*

**Administrador**
* **Email:** `admin@nexbyte.cl`
* **Password:** `Admin123*`

**Vendedor**
* **Email:** `vendedor@nexbyte.cl`
* **Password:** `Vendedor123*`

**Cliente**
* **Email:** `cliente@nexbyte.cl`
* **Password:** `Cliente123*`

---

## ✅ 11) Matriz de cumplimiento (rúbrica E2)
---------------------------------------

| Categoría | Requisito | Estado |
| :--- | :--- | :--- |
| **BACKEND (35 pts)** | | |
| | CRUD Usuarios (campos mínimos, validaciones) | OK |
| | CRUD Productos (precio, stock, categoría, imagen URL/subida) | OK |
| | Autenticación y sesión simple (sin JWT), rol admin | OK |
| | Filtros y búsqueda (usuarios/productos) | OK |
| | Alertas de stock (<5) + endpoint/listado | OK |
| | Base de datos relacional + seed (1 admin, 5 cat., 15 prod.) | OK |
| | Arquitectura en capas y buen código | OK |
| | Testing (JUnit/Mockito) Producto 3–4 / Usuario 2–3 | OK |
| | Documentación REST (Swagger/OpenAPI) | OK |
| **FRONTEND (35 pts)** | | |
| | Migración de templates a componentes | OK |
| | Gestión Productos (lista, crear/editar, eliminar/estado, imagen) | OK |
| | Dashboard (totales + stock crítico) | OK |
| | Búsqueda y filtros (nombre/categoría) | OK |
| | Gestión Usuarios (tabla, crear/editar, eliminar/estado, filtro) | OK |
| | Alertas visuales de stock | OK |
| | Validaciones con feedback visual | OK |
| | Integración API (axios/fetch, loaders, toasts, errores) | OK |
| | UX/UI responsive | OK |
| **INTEGRACIÓN (20 pts)** | | |
| | Comunicación FE–BE, sesión, manejo de errores | OK |
| **GITHUB/DOCS (20 pts)** | | |
| | Uso de GitHub, README, scripts BD, entrega correcta | OK |
| **Bonificación** | | |
| | Paginación en listados | +2 |
| | Librerías adicionales | +2 |
| | Filtros avanzados | +1 |

---

## ⏱️ 12) Plan de demo (15 minutos)
-----------------------------
1.  **Contexto & objetivos** (1 min)
2.  **Arquitectura FE/BE & BD** (2 min)
3.  **Usuarios** (2 min): crear/editar, inhabilitar, filtro/paginación
4.  **Productos** (3 min): crear/editar con imagen, filtro por categoría y búsqueda por nombre
5.  **Dashboard** (2 min): totales y stock < 5 con alertas visuales
6.  **Login & sesión** (2 min): login simple, redirección, logout, panel Admin
7.  **Swagger + Tests** (2 min): mostrar endpoints y `mvn test`
8.  **Cierre** (1 min): matriz de cumplimiento y próximos pasos

---

## 📄 13) Licencia
------------
Proyecto académico — uso educativo.
