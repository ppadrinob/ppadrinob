# 🚀 Guía de Despliegue a Firebase Hosting

## ✅ Pasos Completados:
1. ✅ Firebase CLI instalado
2. ✅ Aplicación construida para producción (carpeta `dist/`)
3. ✅ Archivos de configuración creados (`firebase.json`, `.firebaseignore`)

## 📝 Pasos que DEBES hacer TÚ:

### Paso 1: Iniciar Sesión en Firebase
Abre una terminal de PowerShell como **Administrador** y ejecuta:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
npx firebase-tools login
```

Esto abrirá tu navegador para que inicies sesión con tu cuenta de Google (la misma que usaste para crear el proyecto Firebase).

### Paso 2: Inicializar Firebase en el Proyecto
En la misma terminal, navega a la carpeta del proyecto y ejecuta:

```powershell
cd "C:\Users\Usuario\.gemini\antigravity\scratch\payroll-admin"
npx firebase-tools init hosting
```

Cuando te pregunte:
- **"Please select an option"**: Selecciona "Use an existing project"
- **"Select a default Firebase project"**: Selecciona tu proyecto (el que creaste en Firebase Console)
- **"What do you want to use as your public directory?"**: Escribe `dist`
- **"Configure as a single-page app?"**: Escribe `y` (Yes)
- **"Set up automatic builds and deploys with GitHub?"**: Escribe `n` (No)
- **"File dist/index.html already exists. Overwrite?"**: Escribe `n` (No)

### Paso 3: Desplegar a Firebase
Ejecuta:

```powershell
npx firebase-tools deploy
```

¡Listo! Te dará una URL como: `https://tu-proyecto.web.app`

---

## 🔄 Para Actualizar la Aplicación en el Futuro:

Cada vez que hagas cambios:

```powershell
# 1. Construir la aplicación
npm run build

# 2. Desplegar
npx firebase-tools deploy
```

---

## 📱 Acceder a tu Aplicación:

Después del despliegue, podrás acceder desde cualquier dispositivo en:
- `https://tu-proyecto.web.app`
- `https://tu-proyecto.firebaseapp.com`

---

## ⚠️ Si tienes problemas con PowerShell:

Alternativa usando CMD (Símbolo del sistema):

```cmd
npx firebase-tools login
npx firebase-tools init hosting
npx firebase-tools deploy
```

---

## 🎯 Resumen:
1. Login: `npx firebase-tools login`
2. Init: `npx firebase-tools init hosting`
3. Deploy: `npx firebase-tools deploy`

¡Tu aplicación estará en línea y accesible desde cualquier lugar! 🌍
