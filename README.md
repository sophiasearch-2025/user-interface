# Subsistema de interfaz web para usuarios

Este repositorio contiene el código fuente del *frontend* de Sophia Search, sitio web desarrollado en el ramo de Arquitectura de Software (`INFO229`).

## Tecnologías Utilizadas

* **Next.js**: Framework de React con renderizado del lado del servidor (SSR) y generación estática (SSG). Se utiliza la estructura de **App Router**.
* **React**: Biblioteca para construir interfaces de usuario.
* **TypeScript**: Superconjunto de JavaScript que añade tipado estático.
* **Tailwind CSS v4**: Framework de CSS *utility-first* para un diseño rápido y responsivo. Se utiliza la configuración moderna con `@theme inline` en `globals.css`.

## Guía de inicio rápido

Primero, instala las dependencias:

```bash
npm i
```

Posteriormente, inicia el servidor de desarrollo:

```bash
npm run dev
```

Finalmente, abre [http://localhost:3000](http://localhost:3000) en tu navegador para visualizar.

## Estructura del proyecto

El proyecto sigue la estructura estándar del App Router de Next.js:

```
/
│
├── 📄 .gitignore          (Archivos y carpetas ignorados por Git)
├── 📄 next.config.ts      (Configuración principal de Next.js)
├── 📄 postcss.config.mjs  (Configuración de PostCSS para Tailwind CSS)
├── 📄 package.json        (Dependencias y scripts del proyecto)
├── 📄 tsconfig.json       (Configuración de TypeScript)
│
├── 📁 app/                (Rutas y lógica principal de la aplicación)
│   ├── 📄 layout.tsx      (Layout global, envuelve a todas las páginas)
│   ├── 📄 page.tsx        (Página de inicio - ruta "/")
│   └── 📄 globals.css     (Estilos globales y configuración de @theme de Tailwind)
│
├── 📁 components/         (Componentes reutilizables de React)
│   └── 📄 Navbar.tsx      (Barra de navegación principal del sitio)
│
└── 📁 public/             (Archivos estáticos accesibles públicamente)
    ├── 📄 sophia.png      (Logo de la aplicación)
    └── 📄 favicon.ico     (Icono de la pestaña del navegador)
```

## Guía de estilos

Todos los estilos personalizados (colores, fuentes) se definen directamente en `app/globals.css` usando la directiva `@theme inline` de Tailwind v4.

### Fuentes

* Fuente principal: `Mukta Vaani`. Importada desde Google Fonts en `globals.css` con pesos 400 (regular), 500 (medium), 600 (semibold) y 700 (bold).
  - Variable CSS: `--font-family-sans`

### Paleta de colores

Se utilizan las siguientes variables de CSS para definir la paleta de colores personalizada:

| Variable CSS | Valor Hex | Descripción |
| :--- | :--- | :--- |
| `--color-brand-dark` | `#1d1d1b` | Fondo principal de la aplicación. |
| `--color-link-active` | `#37BDE9` | Links activos (Catálogo, Planes). |
| `--color-link-hover` | `#F2F2F2` | Hover de links y texto de botones principales. |
| `--color-btn-primary-bg` | `#532ECE` | Color de fondo de botones principales". |
