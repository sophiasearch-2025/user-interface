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

Instalar las dependencias:

```bash
npm i
```

Este proyecto utiliza la API de Google Gemini para el chat. Para que funcione localmente:

1.  Obtén una API Key gratuita en [Google AI Studio](https://aistudio.google.com/).
2.  Duplica el archivo `.env.example` y renómbralo a `.env.local`.
3.  Abre `.env.local` y pega tu clave:
    ```bash
    GEMINI_API_KEY=AIzaSy...
    ```


Iniciar el servidor de desarrollo:

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

### 1. Especificación

Estos son los valores de color puros, definidos por el documento de especificaciones de diseño y los mockups.

| Variable (Paleta) | Valor (Hex) | Origen (Spec / Mockup) |
| :--- | :--- | :--- |
| `--palette-purple` | `#532ECE` | Primario |
| `--palette-cyan` | `#44CFE2` | Primario |
| `--palette-black` | `#1D1D1B` | Primario |
| `--palette-grey` | `#818181` | Primario |
| `--palette-green` | `#46C5A5` | Secundario (Corregido) |
| `--palette-red` | `#FF6164` | Secundario |
| `--palette-white` | `#F2F2F2` | Secundario |
| `--palette-yellow` | `#FFC500` | Secundario |
| `--palette-blue-dark`| `#2A3176` | Secundario |
| `--palette-grey-dark` | `#27272A` | Mockup (Fondo de tarjetas) |

### 2. Variables Semánticas

Estas son las variables de propósito específico que usamos en los componentes.

| Variable (Semántica) | Especificación (Valor) | Uso (Clase de Tailwind) | Descripción (Rol) |
| :--- | :--- | :--- | :--- |
| `--color-background` | `var(--palette-black)` | `bg-background` | Fondo principal de la aplicación. |
| `--color-surface-dark` | `var(--palette-grey-dark)` | `bg-surface-dark` | Fondo de menús y tarjetas oscuras (ej. Perfil, Noticias). |
| `--color-surface-light` | `var(--palette-white)` | `bg-surface-light` | Fondo de modales e inputs claros (ej. Registro, Filtros). |
| `--color-surface-accent` | `var(--palette-purple)` | `bg-surface-accent` | Fondo de UI de acento (ej. Menú Filtro, Paginación). |
| `--color-surface-accent-dark` | `var(--palette-blue-dark)`| `bg-surface-accent-dark`| Fondo de UI especial (ej. Plan Premium, Chat, "Aplicar filtros"). |
| `--color-foreground` | `var(--palette-white)` | `text-foreground` | Texto principal sobre fondos oscuros. |
| `--color-foreground-on-light` | `var(--palette-black)` | `text-foreground-on-light`| Texto principal sobre fondos claros (ej. Registro). |
| `--color-text-primary` | `var(--palette-white)` | `text-text-primary` | Texto primario (igual que `foreground`). |
| `--color-text-secondary` | `var(--palette-cyan)` | `text-text-secondary` | Texto secundario (links). |
| `--color-text-muted` | `var(--palette-grey)` | `text-muted` | Texto atenuado sobre fondos oscuros (ej. "Rol de usuario"). |
| `--color-text-muted-on-light` | `var(--palette-grey)` | `text-muted-on-light` | Texto atenuado sobre fondos claros (ej. "Para unirse..."). |
| `--color-text-accent` | `var(--palette-purple)` | `text-text-accent` | Texto de título destacado (ej. "Registrarse"). |
| `--color-text-danger` | `var(--palette-red)` | `text-text-danger` | Texto de peligro (ej. "Cerrar sesión"). |
| `--color-btn-primary-bg` | `var(--palette-purple)` | `bg-btn-primary-bg` | Fondo de botones primarios (ej. "Registrarse"). |
| `--color-btn-primary-text` | `var(--palette-white)` | `text-btn-primary-text` | Texto de botones primarios. |
| `--color-btn-primary-hover-bg` | `var(--palette-white)` | `hover:bg-btn-primary-hover-bg` | Fondo del *hover* del botón primario. |
| `--color-btn-primary-hover-text` | `var(--palette-purple)` | `hover:text-btn-primary-hover-text`| Texto del *hover* del botón primario. |
| `--color-btn-secondary-bg` | `var(--palette-cyan)` | `bg-btn-secondary-bg` | Fondo de botones secundarios (ej. "Obtener Plan"). |
| `--color-btn-secondary-text` | `var(--palette-white)` | `text-btn-secondary-text` | Texto de botones secundarios. |
| `--color-link-active` | `var(--palette-cyan)` | `text-link-active` | Links activos del Navbar. |
| `--color-link-hover` | `var(--palette-white)` | `text-link-hover` | *Hover* de links del Navbar. |
| `--color-link-on-light` | `var(--palette-purple)` | `text-link-on-light` | Links sobre fondos claros (ej. Footer, "Iniciar sesión"). |
| `--color-border-primary` | `var(--palette-cyan)` | `border-border-primary` | Bordes de acento (ej. Menú de perfil). |
| `--color-border-muted-on-light` | `var(--palette-black)` | `border-border-muted-on-light` | Bordes de inputs en fondos claros (ej. Registro). |
| `--color-accent-success` | `var(--palette-green)` | `text-accent-success` | Iconos de éxito (ej. Checkmarks). |
| `--color-accent-warning` | `var(--palette-yellow)` | `text-accent-warning` | Iconos de advertencia. |
