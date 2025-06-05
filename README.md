# Teslo Shop - Tienda de Ropa en Línea

Este proyecto es una aplicación de comercio electrónico completa desarrollada con Next.js, TypeScript, Prisma y PostgreSQL. Permite a los usuarios navegar por productos, administrar el carrito de compra, realizar pedidos y procesar pagos a través de PayPal.

## Características principales

- 🛍️ Catálogo de productos con múltiples categorías
- 🔍 Búsqueda y filtrado de productos
- 🛒 Carrito de compras con persistencia
- 👤 Autenticación y gestión de usuarios
- 📋 Historial de pedidos y seguimiento
- 💳 Integración con PayPal para pagos
- 🖼️ Gestión de imágenes con Cloudinary
- 📱 Diseño responsive para móvil y desktop
- 🔒 Panel de administración para gestionar productos, pedidos y usuarios

## Tecnologías utilizadas

- Frontend: Next.js 15, React 19, TypeScript, TailwindCSS
- Backend: Next.js Server Actions, API Routes
- Base de datos: PostgreSQL, Prisma ORM
- Autenticación: NextAuth.js v5
- Pagos: PayPal API
- Almacenamiento de imágenes: Cloudinary
- Despliegue: Vercel

## Estructura del proyecto

```
teslo-shop/
├── prisma/           # Esquemas y migraciones de Prisma
├── public/           # Archivos estáticos
├── src/
│   ├── actions/      # Server Actions para operaciones del servidor
│   ├── app/          # Rutas y componentes de la aplicación (App Router)
│   ├── components/   # Componentes reutilizables
│   ├── interfaces/   # Interfaces TypeScript
│   ├── lib/          # Utilidades y configuraciones
│   └── seed/         # Scripts para poblar la base de datos
└── ...
```

## Requisitos previos

- Node.js 20 o superior
- npm o yarn
- Docker (para PostgreSQL)
- Cuenta de PayPal Developer
- Cuenta de Cloudinary (para gestión de imágenes)

## Instalación y configuración

### Paso 1: Preparar el entorno

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/teslo-shop.git
cd teslo-shop

# Crear archivo de variables de entorno
cp .env.template .env

# Editar .env con tus propias variables de entorno
# Especialmente DATABASE_URL, AUTH_SECRET, y las claves de PayPal y Cloudinary
```

### Paso 2: Instalar dependencias

```bash
npm install
```

### Paso 3: Configurar la base de datos

```bash
# Levantar PostgreSQL con Docker
docker compose up -d

# Ejecutar migraciones de Prisma
npx prisma migrate dev

# Poblar la base de datos con datos iniciales
npm run seed
```

### Paso 4: Iniciar el servidor de desarrollo

```bash
npm run dev
```

### Paso 5: Acceder a la aplicación

- Abre [http://localhost:3000](http://localhost:3000) en tu navegador.
- Asegúrate de limpiar el localStorage del navegador si has ejecutado versiones anteriores.

### Paso 6: Limpiar el localStorage del navegador

Para evitar conflictos con datos almacenados de versiones anteriores, limpia el localStorage del navegador:

- **En Chrome/Edge**: 
  1. Presiona `F12` para abrir las herramientas de desarrollo.
  2. Ve a la pestaña `Application`.
  3. En la sección `Storage`, selecciona `Local Storage`.
  4. Haz clic en `Clear All`.

- **En Firefox**:
  1. Presiona `F12` para abrir las herramientas de desarrollo.
  2. Ve a la pestaña `Storage`.
  3. Selecciona `Local Storage`.
  4. Haz clic en `Clear`.

## Guía rápida para nuevos desarrolladores

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/teslo-shop.git
   cd teslo-shop
   ```

2. **Crear una copia del `.env.template` y renombrarlo a `.env`**
   ```bash
   cp .env.template .env
   # Editar el archivo .env con tus credenciales y configuración
   ```

3. **Instalar dependencias**
   ```bash
   npm install
   ```

4. **Levantar la base de datos**
   ```bash
   docker compose up -d
   ```

5. **Correr las migraciones de Prisma**
   ```bash
   npx prisma migrate dev
   ```

6. **Ejecutar seed**
   ```bash
   npm run seed
   ```

7. **Correr el proyecto**
   ```bash
   npm run dev
   ```

8. **Limpiar el localStorage del navegador**
   - En Chrome/Edge: F12 > Application > Storage > Local Storage > Clear All
   - En Firefox: F12 > Storage > Local Storage > Clear

---

## Variables de entorno requeridas

```properties
# Base de datos
DATABASE_URL="prisma://postgres:password@localhost:5432/teslo?schema=public"

# Autenticación
AUTH_SECRET="tu_clave_secreta"
NEXTAUTH_SECRET="tu_clave_secreta"

# PayPal
NEXT_PUBLIC_PAYPAL_CLIENT_ID="tu_client_id_paypal"
PAYPAL_SECRET="tu_secret_paypal"
PAYPAL_OAUTH_URL=https://api-m.sandbox.paypal.com/v1/oauth2/token
PAYPAL_ORDERS_URL=https://api.sandbox.paypal.com/v2/checkout/orders

# Cloudinary
CLOUDINARY_URL=cloudinary://tu_api_key:tu_api_secret@tu_cloud_name
```

---

## Usuarios de prueba

| Email             | Contraseña | Rol      |
|-------------------|------------|----------|
| admin@test.com    | 123456     | admin    |
| user@test.com     | 123456     | cliente  |

---

## Comandos disponibles

```bash
# Desarrollo
npm run dev         # Inicia servidor de desarrollo con Turbopack

# Construcción
npm run build       # Construye la aplicación para producción

# Producción
npm run start       # Inicia la aplicación en modo producción

# Base de datos
npm run seed        # Pobla la base de datos con datos iniciales
npx prisma studio   # Interfaz visual para explorar la base de datos

# Lint y formato
npm run lint        # Ejecuta el linter
```

### Próximas mejoras

- [ ] Liberar el stock de los carritos luego de 30 minutos
- [ ] Implementar sistema de reseñas de productos
- [ ] Añadir filtros avanzados en la búsqueda
- [ ] Integrar más métodos de pago
- [ ] Implementar notificaciones por correo electrónico

## Contribuciones

Las contribuciones son bienvenidas. Por favor, asegúrate de seguir las convenciones de código y añadir pruebas para nuevas características.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

## Contacto

Para preguntas o sugerencias, por favor contacta a [tu-email@ejemplo.com](mailto:tu-email@ejemplo.com).

---

Desarrollado con ❤️ usando Next.js y TypeScript.