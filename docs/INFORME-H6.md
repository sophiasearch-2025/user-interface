# Informe de Implementación: Autenticación y Perfil de Usuario (H6)

## 1. Introducción y Contexto

El presente informe se centra en el desarrollo de la funcionalidad crítica de autenticación de usuarios para nuestra plataforma. Esta implementación responde directamente a la necesidad de identificar a los usuarios para ofrecerles una experiencia segura y personalizada.

El alcance de este desarrollo está definido por la **Historia de Usuario 6 (H6)** del backlog del producto.

### Historia de Usuario 6 (H6)

> **"Como Usuario quiero poder acceder a mi cuenta para poder visualizar mis datos de forma personalizada."**

Para satisfacer esta historia, se abordaron tres puntos clave del backlog (Puntos 11, 12 y 13), que abarcan desde la creación de las interfaces de usuario hasta la lógica de conexión entre el cliente (frontend) y el servidor (backend).

---

## 2. Desglose de la Implementación Técnica

La solución se construyó siguiendo una arquitectura moderna, separando las responsabilidades entre la interfaz de usuario, la gestión del estado de la sesión y la API del servidor. A continuación, se detalla cómo se abordó cada punto del backlog.

### 2.1. Punto 11: Creación de la Vista del Login (Frontend)

**Objetivo:** Desarrollar la interfaz gráfica que permite al usuario ingresar sus credenciales.

**Implementación (`Login.tsx`):**
Se creó el componente `Login.tsx`. Este componente es responsable de renderizar el formulario de acceso.

* **Gestión de Formularios:** Se implementó utilizando librerías modernas para el manejo de estado de formularios (react-hook-form en conjunto con validación Zod, inferido por la estructura del código). Esto asegura que los campos de "correo electrónico" y "contraseña" sean validados en el cliente antes de ser enviados.
* **Experiencia de Usuario (UX):** El formulario incluye manejo de estados de carga (`isLoading`) para deshabilitar el botón de envío mientras se procesa la solicitud, y una sección para mostrar mensajes de error (`errorMessage`) en caso de credenciales inválidas o problemas de red.

### 2.2. Punto 12: Lógica del Login y Conexión al Backend

**Objetivo:** Manejar el envío del formulario, validar las credenciales contra el servidor y gestionar el token de sesión resultante.

Esta es la parte central de la implementación y se divide en tres capas:

#### A. Lógica del Componente (Frontend - `Login.tsx`)

Cuando el usuario envía el formulario, la función `onSubmit` captura los datos (email y contraseña). Esta función invoca al método `login` proveniente de nuestro hook personalizado de autenticación (`useAuth`). Si la operación falla, el componente captura el error y lo muestra al usuario.

#### B. Capa de Servicio y Sesión (`session.ts`)

El archivo `session.ts` actúa como el puente entre la interfaz y la API. Contiene la función `login(data)`, que realiza la petición HTTP `POST` al endpoint `/api/auth/login`.

* **Responsabilidad:** Su tarea principal es enviar las credenciales y, si la respuesta es exitosa, recibir el token de autenticación y los datos del usuario, almacenándolos de manera segura en el navegador (para mantener la sesión activa). También provee la función `logout` para limpiar estos datos.

#### C. Integración con el Backend (API Route - `route.ts`)

Se implementó un manejador de ruta en el servidor (Next.js API Route) que escucha las peticiones `POST` en `/api/auth/login`.

* **Validación de Entrada:** El backend utiliza un esquema Zod (`loginSchema`) para asegurar que los datos recibidos tengan el formato correcto (email válido y contraseña).
* **Entorno Simulado (Mock Data):** Para esta fase inicial del desarrollo, el backend **no** se conecta a una base de datos real. Como se evidencia en el código, utiliza datos simulados (`mockUser`) para validar las credenciales.
* *Comportamiento actual:* Si el email es "test@example.com" y la contraseña es "password123", el sistema responde con un código 200 OK, un token simulado ("mock_token_...") y los datos del usuario de prueba. De lo contrario, devuelve un error 401 (No autorizado).



### 2.3. Punto 13: Creación de la Vista del Perfil (Frontend)

**Objetivo:** Una vez autenticado, el usuario debe poder ver sus datos básicos y tener la opción de cerrar sesión.

**Implementación (`UserProfileMenu.tsx` y `page.tsx`):**

* **Visualización Condicional (`page.tsx`):** El componente principal de la página utiliza el estado de la sesión para decidir qué mostrar. Si no hay sesión activa, muestra los botones de autenticación (`AuthButtons`). Si la sesión está activa, renderiza el `UserProfileMenu`.
* **Menú de Usuario (`UserProfileMenu.tsx`):** Este componente consume los datos del usuario almacenados en la sesión (Nombre y Rol) y los muestra en pantalla. Incluye un botón crítico: "Cerrar sesión", el cual invoca la función `logout()` definida en la capa de servicio (`session.ts`), terminando efectivamente la sesión del usuario y devolviéndolo a la vista inicial.

---

## 3. Resumen del Flujo Técnico (Happy Path)

Para ilustrar cómo funciona la implementación en conjunto, describimos el flujo exitoso de un usuario:

1. **Inicio:** El usuario navega a la página principal y, al no estar autenticado, ve el componente `AuthButtons`.
2. **Interacción:** El usuario hace clic en "Iniciar sesión", lo que despliega el componente `Login.tsx`.
3. **Entrada de Datos:** El usuario introduce "test@example.com" y "password123" y hace clic en el botón de envío.
4. **Validación Frontend:** `Login.tsx` valida que los campos no estén vacíos y que el email tenga formato correcto.
5. **Envío:** La función `login` en `session.ts` envía un `POST` a `/api/auth/login` con las credenciales.
6. **Procesamiento Backend:** `route.ts` recibe la petición, valida el esquema, y compara las credenciales con los datos simulados (`mockUser`). Al coincidir, retorna un token y los datos del usuario.
7. **Gestión de Sesión:** `session.ts` recibe la respuesta exitosa y guarda el token y los datos del usuario en el almacenamiento del navegador.
8. **Actualización de UI:** El estado de la aplicación cambia a "autenticado". El componente principal (`page.tsx`) detecta este cambio y reemplaza los botones de login por el `UserProfileMenu`, mostrando "Bienvenido, Test User".

---

## 4. Desafíos Futuros

Aunque la implementación actual satisface los requerimientos funcionales básicos de la H6 para esta etapa, existen desafíos importantes para pasar a un entorno de producción real:

1. **Integración con Base de Datos Real:** El desafío más crítico es reemplazar el sistema de datos simulados (`mockUser` en `route.ts`) por una conexión a una base de datos real para validar usuarios registrados de forma persistente.
2. **Seguridad del Token (JWT):** Actualmente se utiliza un token simulado. Se debe implementar la generación y firma real de JSON Web Tokens (JWT) en el backend, y su correcta validación en rutas protegidas.
3. **Funcionalidades Pendientes del Backlog:** El punto 11 del backlog mencionaba funcionalidades como "Remember me" (Recuérdame) y "Forgot password" (Olvidé mi contraseña). Estas características no están presentes en el código actual y deben ser desarrolladas en iteraciones futuras.
4. **Manejo Robusto de Errores:** Mejorar la granularidad de los mensajes de error provenientes del backend (ej. diferenciar entre "usuario no encontrado" y "contraseña incorrecta" si la política de seguridad lo permite) para dar mejor feedback al usuario en el frontend.