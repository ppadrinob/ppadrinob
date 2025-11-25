// Tipos de documento para nómina electrónica
// Cada tipo tiene un código único usado en la transmisión DIAN
export const documentTypes = [
    { id: 11, code: '11', name: 'Registro civil', shortName: 'RC' },
    { id: 12, code: '12', name: 'Tarjeta de Identidad', shortName: 'TI' },
    { id: 13, code: '13', name: 'Cédula de Ciudadanía', shortName: 'CC' },
    { id: 21, code: '21', name: 'Tarjeta de Extranjería', shortName: 'TE' },
    { id: 22, code: '22', name: 'Cédula de Extranjería', shortName: 'CE' },
    { id: 31, code: '31', name: 'NIT', shortName: 'NIT' },
    { id: 41, code: '41', name: 'Pasaporte', shortName: 'PAS' },
    { id: 47, code: '47', name: 'Permiso Especial (PEP)', shortName: 'PEP' }
];

// Función helper para obtener el código por nombre corto
export const getDocumentTypeCode = (shortName) => {
    const docType = documentTypes.find(dt => dt.shortName === shortName);
    return docType ? docType.code : null;
};

// Función helper para obtener el tipo completo por código
export const getDocumentTypeByCode = (code) => {
    return documentTypes.find(dt => dt.code === code);
};

// Función helper para obtener el tipo completo por nombre corto
export const getDocumentTypeByShortName = (shortName) => {
    return documentTypes.find(dt => dt.shortName === shortName);
};
