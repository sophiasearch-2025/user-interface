# Subsistema de interfaz web para usuarios

Este repositorio contiene el código fuente del *frontend* de Sophia Search, sitio web desarrollado en el ramo de Arquitectura de Software (`INFO229`).

## Tecnologías Utilizadas

* **Next.js**: Framework de React con renderizado del lado del servidor (SSR) y generación estática (SSG). Se utiliza la estructura de **App Router**.
* **React**: Biblioteca para construir interfaces de usuario.
* **TypeScript**: Superconjunto de JavaScript que añade tipado estático.
* **Tailwind CSS v4**: Framework de CSS *utility-first* para un diseño rápido y responsivo. Se utiliza la configuración moderna con `@theme inline` en `globals.css`.
* **Lucide React**: Biblioteca de íconos SVG para React.
* **Framer Motion**: Biblioteca para manejar animaciones y transiciones en React.

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
├── 📄 .gitignore               (Archivos y carpetas ignorados por Git)
├── 📄 next.config.ts           (Configuración principal de Next.js)
├── 📄 postcss.config.mjs       (Configuración de PostCSS para Tailwind CSS)
├── 📄 package.json             (Dependencias y scripts del proyecto)
├── 📄 tsconfig.json            (Configuración de TypeScript)
│
├── 📁 app/                     (Rutas y lógica principal de la aplicación)
│   ├── 📄 layout.tsx           (Layout global, envuelve a todas las páginas)
│   ├── 📄 page.tsx             (Página de inicio - ruta "/")
│   └── 📄 globals.css          (Estilos globales y configuración de @theme de Tailwind)
│
├── 📁 components/              (Componentes reutilizables de React)
│   └── 📄 Navbar.tsx           (Barra de navegación principal del sitio)
│   └── 📄 UserProfileMenu.tsx  (Barra de navegación principal del sitio)
│
└── 📁 public/                  (Archivos estáticos accesibles públicamente)
    ├── 📄 sophia_dark_bg.png           (Logo de la aplicación para fondos oscuros)
    ├── 📄 sophia_light_bg.png          (Logo de la aplicación para fondos claros)
    └── 📄 favicon.ico          (Icono de la pestaña del navegador)
```

## Guía de estilos

Todos los estilos personalizados (colores, fuentes) se definen directamente en `app/globals.css` usando la directiva `@theme inline` de Tailwind v4.

### Fuentes

* Fuente principal: `Mukta Vaani`. Importada desde Google Fonts con pesos 400 (regular), 500 (medium), 600 (semibold) y 700 (bold).
  - Variable CSS: `--font-family-sans`

### Paleta de colores

Todos los estilos personalizados se definen en `app/globals.css` usando un sistema de dos capas:

1.  **Especificación**: Variables `--palette-` que definen los colores puros a partir de la especificación entregada.
2.  **Variables semánticas**: Variables `--color-` que le dan un rol (un uso) a esos colores.

#### 1. Especificación

| Variable (Paleta) | Valor (Hex) | Origen (Spec) |
| :--- | :--- | :--- |
| `--palette-purple` | `#532ECE` | Primario |
| `--palette-cyan` | `#44CFE2` | Primario |
| `--palette-black` | `#1D1D1B` | Primario |
| `--palette-grey` | `#818181` | Primario |
| `--palette-green` | `#46C5A5` | Secundario |
| `--palette-red` | `#FF6164` | Secundario |
| `--palette-white` | `#F2F2F2` | Secundario |
| `--palette-yellow` | `#FFC500` | Secundario |
| `--palette-blue-dark`| `#2A3176` | Secundario |

#### 2. Variables semánticas *(sujeto a cambios)*

| Variable (Semántica) | Especificación (Valor) | Uso (Clase de Tailwind) | Descripción (Rol) |
| :--- | :--- | :--- | :--- |
| `--color-background` | `var(--palette-black)` | `bg-background` | Fondo principal de la aplicación. |
| `--color-foreground` | `var(--palette-white)` | `text-foreground` | Color de texto principal (blanco). |
| `--color-surface` | `var(--palette-blue-dark)`| `bg-surface` | Fondo de elementos "elevados" (menús, tarjetas). |
| `--color-text-primary`| `var(--palette-white)` | `text-text-primary`| Texto primario (igual que `foreground`). |
| `--color-text-muted` | `var(--palette-grey)` | `text-muted` | Texto atenuado (ej: "Rol de usuario"). |
| `--color-text-danger` | `var(--palette-red)` | `text-text-danger` | Texto de peligro (ej: "Cerrar sesión"). |
| `--color-btn-primary-bg` | `var(--palette-purple)` | `bg-btn-primary-bg` | Fondo del botón "Registrarse". |
| `--color-btn-primary-hover-bg` | `var(--palette-white)` | `hover:bg-btn-primary-hover-bg` | Fondo del *hover* del botón "Registrarse". |
| `--color-btn-primary-hover-text` | `var(--palette-purple)`| `hover:text-btn-primary-hover-text`| Texto del *hover* del botón "Registrarse". |
| `--color-link-active` | `var(--palette-cyan)` | `text-link-active` | Links activos (Catálogo, Planes). |
| `--color-link-hover` | `var(--palette-white)` | `text-link-hover` | *Hover* de links y texto del botón "Registrarse". |
| `--color-border-primary`| `var(--palette-cyan)` | `border-border-primary` | Bordes de acento (ej: menú de perfil). |
