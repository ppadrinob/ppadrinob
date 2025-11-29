# 🚀 Guía Completa: Desplegar Aplicación de Nómina desde Equipo Nuevo

## 📋 **Requisitos Previos**

### Software Necesario:
1. **Node.js v20 o superior**
   - Descargar: https://nodejs.org/
   - Instalar la versión LTS (recomendada)
   - Verificar instalación: `node -v`

2. **Git** (si no lo tienes)
   - Descargar: https://git-scm.com/
   - Verificar instalación: `git --version`

---

## 🔥 **Pasos para Desplegar en Firebase Hosting**

### **Paso 1: Clonar el Repositorio**

Abre PowerShell o CMD y ejecuta:

```powershell
# Clonar el proyecto desde Git
git clone [URL-DE-TU-REPOSITORIO-GIT]

# Entrar a la carpeta del proyecto
cd payroll-admin
```

---

### **Paso 2: Instalar Dependencias**

```powershell
npm install
```

Esto instalará todas las librerías necesarias (React, Vite, Firebase, etc.)
⏱️ Tiempo: 2-3 minutos

---

### **Paso 3: Construir la Aplicación para Producción**

```powershell
npm run build
```

Esto creará la carpeta `dist/` con tu aplicación optimizada.
⏱️ Tiempo: 30 segundos

---

### **Paso 4: Instalar Firebase CLI**

```powershell
npm install -g firebase-tools
```

⏱️ Tiempo: 1-2 minutos

---

### **Paso 5: Iniciar Sesión en Firebase**

```powershell
firebase login
```

**Qué pasará:**
- Se abrirá tu navegador
- Inicia sesión con tu cuenta de Google (la misma que usaste para crear el proyecto Firebase)
- Autoriza Firebase CLI
- Vuelve a la terminal

---

### **Paso 6: Inicializar Firebase Hosting**

```powershell
firebase init hosting
```

**Responde las preguntas así:**

| Pregunta | Respuesta |
|----------|-----------|
| Please select an option | `Use an existing project` |
| Select a default Firebase project | Selecciona tu proyecto de la lista |
| What do you want to use as your public directory? | `dist` |
| Configure as a single-page app (rewrite all urls to /index.html)? | `y` (Yes) |
| Set up automatic builds and deploys with GitHub? | `n` (No) |
| File dist/index.html already exists. Overwrite? | `n` (No) |

---

### **Paso 7: Desplegar a Firebase** 🚀

```powershell
firebase deploy
```

**Resultado esperado:**
```
✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/tu-proyecto/overview
Hosting URL: https://tu-proyecto.web.app
```

🎉 **¡Tu aplicación está en línea!**

---

### **(Opcional) Paso 8: Crear Canales de Vista Previa**
Si quieres probar cambios sin afectar el sitio principal, puedes crear un "canal" temporal:

```powershell
firebase hosting:channel:deploy nombre-del-canal
```

Esto generará una URL temporal (ej. `https://tu-proyecto--nombre-del-canal.web.app`) que podrás compartir. Es ideal para pruebas.

---

## 🔄 **Para Actualizar la Aplicación en el Futuro**

Cada vez que hagas cambios al código:

```powershell
# 1. Asegúrate de tener los últimos cambios
git pull

# 2. Instalar dependencias (si hay nuevas)
npm install

# 3. Construir la aplicación
npm run build

# 4. Desplegar
firebase deploy
```

---

## 📱 **Acceder a tu Aplicación**

Después del despliegue, tu aplicación estará disponible en:
- **URL Principal:** `https://tu-proyecto.web.app`
- **URL Alternativa:** `https://tu-proyecto.firebaseapp.com`

Puedes acceder desde:
- ✅ Cualquier computadora
- ✅ Celular
- ✅ Tablet
- ✅ Cualquier lugar con internet

---

## 🆘 **Solución de Problemas Comunes**

### Error: "Firebase CLI is incompatible with Node.js"
**Solución:** Actualiza Node.js a la versión 20 o superior
```powershell
node -v  # Verificar versión actual
```
Descargar versión nueva: https://nodejs.org/

### Error: "Command not found: firebase"
**Solución:** Reinstala Firebase CLI
```powershell
npm install -g firebase-tools
```

### Error: "Permission denied"
**Solución:** Ejecuta PowerShell como Administrador
- Clic derecho en PowerShell → "Ejecutar como administrador"

### Error: "Port 3000 is already in use"
**Solución:** Cierra otras aplicaciones que usen el puerto 3000 o usa otro puerto

---

## 📊 **Información del Proyecto**

### Tecnologías Utilizadas:
- **Frontend:** React + Vite
- **Base de Datos:** Firebase Firestore
- **Hosting:** Firebase Hosting
- **Autenticación:** Firebase Auth
- **Estilos:** CSS con Glassmorphism

### Módulos Implementados:
- ✅ Gestión de Empresas
- ✅ Gestión de Usuarios (con roles)
- ✅ Gestión de Empleados (completo)
- ✅ Gestión de Centros de Costo
- ✅ Bitácora de Auditoría
- ✅ Sistema de Login

---

## 🔐 **Credenciales Importantes**

**Firebase:**
- Email: [tu-email@gmail.com]
- Proyecto: [nombre-de-tu-proyecto]
- Consola: https://console.firebase.google.com/

**Usuario Admin por Defecto:**
- Email: admin@demo.com
- Password: admin123

⚠️ **IMPORTANTE:** Cambia estas credenciales en producción

---

## ⏱️ **Tiempo Total Estimado**

| Paso | Tiempo |
|------|--------|
| Clonar repositorio | 1-2 min |
| npm install | 2-3 min |
| npm run build | 30 seg |
| Firebase CLI install | 1-2 min |
| Firebase login | 1 min |
| Firebase init | 1 min |
| Firebase deploy | 1-2 min |
| **TOTAL** | **~10 minutos** |

---

## 📞 **Soporte**

Si tienes problemas:
1. Revisa la sección "Solución de Problemas Comunes"
2. Verifica que Node.js sea v20+: `node -v`
3. Verifica que Firebase CLI esté instalado: `firebase --version`
4. Revisa la consola de Firebase: https://console.firebase.google.com/

---

## ✅ **Checklist Final**

Antes de desplegar, verifica:
- [ ] Node.js v20+ instalado
- [ ] Git instalado
- [ ] Repositorio clonado
- [ ] `npm install` ejecutado
- [ ] `npm run build` ejecutado sin errores
- [ ] Firebase CLI instalado
- [ ] Sesión iniciada en Firebase
- [ ] Proyecto Firebase seleccionado
- [ ] Deploy completado exitosamente

---

## 🎯 **Comandos Rápidos (Copy-Paste)**

```powershell
# Setup completo (ejecutar en orden)
git clone [tu-repo]
cd payroll-admin
npm install
npm run build
npm install -g firebase-tools
firebase login

# IMPORTANTE: Como empezamos de cero, debes ejecutar esto:
firebase init hosting

# Cuando pregunte "Public directory", escribe: dist
# Cuando pregunte "Configure as a single-page app", escribe: y
# Cuando pregunte "Overwrite dist/index.html", escribe: n

firebase deploy
```

---

**¡Éxito con tu despliegue!** 🚀

Fecha de creación: 28 de Noviembre, 2025
