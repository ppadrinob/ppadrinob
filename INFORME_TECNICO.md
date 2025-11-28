# Informe Técnico del Proyecto: NominaPro

## 1. Descripción General
**NominaPro** es una plataforma web administrativa diseñada para la gestión de nómina, empleados y empresas. El sistema permite a los administradores (Super Admin y Admin de Empresa) gestionar el ciclo de vida de los empleados, la configuración de empresas y el control de usuarios del sistema, todo bajo un entorno seguro y con auditoría de cambios.

## 2. Stack Tecnológico

### Frontend
*   **Framework Principal:** [React](https://reactjs.org/) (v17.0.2) - Biblioteca de JavaScript para construir interfaces de usuario.
*   **Empaquetador (Bundler):** [Vite](https://vitejs.dev/) (v2.9.0) - Herramienta de construcción frontend rápida y moderna.
*   **Lenguaje:** JavaScript (ES6+).
*   **Estilos:** CSS3 Nativo con arquitectura de variables CSS (Custom Properties) para theming y diseño responsivo. Se implementa un diseño estilo "Glassmorphism" (paneles translúcidos con desenfoque).

### Backend & Persistencia (BaaS)
*   **Plataforma:** [Firebase](https://firebase.google.com/) (v9.23.0).
*   **Base de Datos:** Firestore (NoSQL) - Almacenamiento de datos en tiempo real para Empresas, Empleados, Usuarios y Logs de Auditoría.
*   **Autenticación:** Firebase Authentication (Email/Password).

### Herramientas de Desarrollo
*   **Control de Versiones:** Git.
*   **Gestor de Paquetes:** npm.

## 3. Arquitectura del Proyecto

El proyecto sigue una estructura modular basada en componentes de React:

```
src/
├── components/
│   ├── Auth/           # Gestión de sesión (Login)
│   ├── Layout/         # Estructura base (Sidebar, Header, Responsive Wrapper)
│   ├── Modules/        # Módulos funcionales del negocio
│   │   ├── Company/    # Gestión de Empresas
│   │   ├── Employees/  # Gestión de Empleados (CRUD completo)
│   │   └── Users/      # Gestión de Usuarios del sistema
│   └── UI/             # Componentes reutilizables (Modal, etc.)
├── context/            # Estado global (AuthContext para sesión de usuario)
├── data/               # Datos estáticos y catálogos (Bancos, EPS, Ciudades, etc.)
├── services/           # Capa de comunicación con Firebase (firestoreService.js)
├── styles/             # Estilos globales y variables de diseño
└── utils/              # Utilidades (Seguridad/Hashing)
```

## 4. Módulos y Funcionalidades Principales

### A. Módulo de Autenticación (`Auth`)
*   **Login Seguro:** Autenticación mediante correo y contraseña contra Firebase Auth.
*   **Contexto de Sesión:** Manejo de estado global del usuario logueado.

### B. Módulo de Empresas (`Company`)
*   **Gestión:** Creación y edición de empresas (Razón Social, NIT, Dirección).
*   **Listado:** Visualización de empresas registradas.
*   **Auditoría:** Registro automático de cambios en la información de la empresa.

### C. Módulo de Empleados (`Employees`)
*   **Formulario Completo:** Captura exhaustiva de datos:
    *   **Personales:** Documento (con validación de duplicados), Nombres, Nacimiento, Contacto.
    *   **Laborales:** Cargo, Salario, Tipo de Contrato, Fechas.
    *   **Seguridad Social:** Afiliaciones a EPS, AFP, ARL, Caja de Compensación.
    *   **Bancarios:** Cuenta y Banco para nómina.
*   **Validaciones:**
    *   Prevención de documentos de identidad duplicados.
    *   Protección contra pérdida de datos no guardados al intentar navegar fuera del formulario.
*   **Detalle:** Vista de solo lectura con toda la información del empleado.

### D. Módulo de Usuarios (`Users`)
*   **Roles:** Gestión de usuarios con roles diferenciados (`super_admin`, `company_admin`).
*   **Seguridad:** Hashing de contraseñas antes de almacenarlas (simulado/preparado en `utils/security.js`).

### E. Auditoría y Logs
*   Sistema transversal que registra quién hizo qué, cuándo y qué datos cambiaron (valor anterior vs. valor nuevo) para entidades críticas como Empresas y Empleados.

## 5. Componentes UI Destacados

*   **Layout Responsive:** Sistema de navegación con barra lateral (Sidebar) que se adapta a dispositivos móviles (se oculta/muestra con botón hamburguesa).
*   **Glass Panel:** Contenedores con efecto de vidrio esmerilado (`backdrop-filter: blur`) que definen la identidad visual de la app.
*   **Modal Personalizado:** Ventana emergente reutilizable con animaciones y fondo semitransparente para alertas y confirmaciones, reemplazando las alertas nativas del navegador.

## 6. Diseño y UX
*   **Estilo Visual:** Interfaz moderna "Dark Mode" con acentos en gradientes (Indigo a Rosa).
*   **Feedback:** Uso de modales y alertas para confirmar acciones críticas (borrar, salir sin guardar).
*   **Adaptabilidad:** Tablas con desplazamiento horizontal y menús colapsables para asegurar la usabilidad en teléfonos y tablets.
