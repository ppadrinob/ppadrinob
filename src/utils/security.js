// Utilidad para encriptación de contraseñas usando SHA-256 nativo del navegador

export const hashPassword = async (password) => {
    if (!password) return '';
    const msgBuffer = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
};

export const verifyPassword = async (inputPassword, storedPassword) => {
    // 1. Verificar si es una contraseña legacy (texto plano)
    if (inputPassword === storedPassword) {
        return { valid: true, isLegacy: true };
    }

    // 2. Verificar hash
    const inputHash = await hashPassword(inputPassword);
    if (inputHash === storedPassword) {
        return { valid: true, isLegacy: false };
    }

    return { valid: false };
};
