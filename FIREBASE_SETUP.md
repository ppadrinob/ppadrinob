# 🔥 Configuración de Firebase para NominaPro

## 📋 Paso 1: Crear Proyecto en Firebase

1. Ve a: https://console.firebase.google.com/
2. Haz clic en **"Agregar proyecto"** o **"Add project"**
3. Nombre del proyecto: `payroll-admin` (o el que prefieras)
4. **Desactiva** Google Analytics (no lo necesitas por ahora)
5. Haz clic en **"Crear proyecto"**

## 📊 Paso 2: Configurar Firestore Database

1. En el menú lateral, haz clic en **"Firestore Database"**
2. Haz clic en **"Crear base de datos"**
3. Selecciona **"Iniciar en modo de prueba"** (test mode)
4. Ubicación: Elige `southamerica-east1` (Brasil - más cercano a Colombia)
5. Haz clic en **"Habilitar"**

## 🔑 Paso 3: Obtener Credenciales

1. Haz clic en el ícono de engranaje ⚙️ → **"Configuración del proyecto"**
2. Baja hasta **"Tus apps"**
3. Haz clic en el ícono `</>` (Web)
4. Registra la app con el nombre: `payroll-admin-web`
5. **NO** marques "También configurar Firebase Hosting"
6. Haz clic en **"Registrar app"**
7. **COPIA** el objeto `firebaseConfig` que aparece

Ejemplo de lo que verás:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "payroll-admin-xxxxx.firebaseapp.com",
  projectId: "payroll-admin-xxxxx",
  storageBucket: "payroll-admin-xxxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:xxxxxxxxxxxxx"
};
```

## 💻 Paso 4: Configurar en tu Proyecto

### Opción A: Editar directamente `firebase.js` (Desarrollo rápido)

1. Abre el archivo: `src/config/firebase.js`
2. Reemplaza los valores de `firebaseConfig` con los tuyos
3. Guarda el archivo

⚠️ **IMPORTANTE**: Si haces esto, NO subas este archivo a Git público

### Opción B: Usar variables de entorno (Recomendado)

1. Crea un archivo `.env.local` en la raíz del proyecto
2. Copia el contenido de `.env.example`
3. Reemplaza con tus valores reales:

```env
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=payroll-admin-xxxxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=payroll-admin-xxxxx
VITE_FIREBASE_STORAGE_BUCKET=payroll-admin-xxxxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:xxxxxxxxxxxxx
```

4. Actualiza `src/config/firebase.js` para usar las variables de entorno

## 🔒 Paso 5: Configurar Reglas de Seguridad (Importante)

1. En Firebase Console, ve a **Firestore Database** → **Reglas**
2. Reemplaza las reglas con:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura/escritura solo en modo de desarrollo
    // TODO: Cambiar en producción para requerir autenticación
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

3. Haz clic en **"Publicar"**

⚠️ **NOTA**: Estas reglas son SOLO para desarrollo. En producción debes agregar autenticación.

## ✅ Paso 6: Verificar Instalación

1. Reinicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Abre la consola del navegador (F12)
3. Deberías ver que Firebase se conecta sin errores

## 🔄 Sincronización entre Equipos

Una vez configurado Firebase:

1. **En este equipo**: Los datos se guardarán en Firebase automáticamente
2. **En tu otro equipo**:
   - Clona el repositorio
   - Crea el archivo `.env.local` con las MISMAS credenciales
   - Ejecuta `npm install`
   - Ejecuta `npm run dev`
   - ¡Los datos estarán sincronizados! 🎉

## 📝 Notas Importantes

- ✅ El archivo `.env.local` NO se sube a Git (está en `.gitignore`)
- ✅ El archivo `.env.example` SÍ se sube a Git (como plantilla)
- ✅ Comparte las credenciales de forma segura (no por Git público)
- ✅ En producción, usa reglas de seguridad más estrictas

## 🆘 Problemas Comunes

### Error: "Firebase: Error (auth/api-key-not-valid)"
- Verifica que copiaste bien el `apiKey`
- Asegúrate de no tener espacios extra

### Error: "Missing or insufficient permissions"
- Ve a Firestore → Reglas
- Verifica que las reglas permitan lectura/escritura

### Los datos no se sincronizan
- Verifica que ambos equipos usen el MISMO `projectId`
- Revisa la consola del navegador por errores

## 📞 Soporte

Si tienes problemas, revisa:
- Firebase Console: https://console.firebase.google.com/
- Documentación: https://firebase.google.com/docs/firestore
