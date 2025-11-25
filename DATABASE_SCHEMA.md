# Catálogo de Tipos de Documento para Nómina Electrónica

Este archivo contiene la información de los tipos de documento que deben ser guardados en la base de datos para la transmisión de nómina electrónica a la DIAN.

## Tabla: `document_types`

### Estructura de la tabla:

```sql
CREATE TABLE document_types (
    id INT PRIMARY KEY,
    code VARCHAR(2) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    short_name VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Datos a insertar:

```sql
INSERT INTO document_types (id, code, name, short_name) VALUES
(11, '11', 'Registro civil', 'RC'),
(12, '12', 'Tarjeta de Identidad', 'TI'),
(13, '13', 'Cédula de Ciudadanía', 'CC'),
(21, '21', 'Tarjeta de Extranjería', 'TE'),
(22, '22', 'Cédula de Extranjería', 'CE'),
(31, '31', 'NIT', 'NIT'),
(41, '41', 'Pasaporte', 'PAS'),
(47, '47', 'Permiso Especial (PEP)', 'PEP');
```

## Tabla: `cities`

### Estructura de la tabla:

```sql
CREATE TABLE cities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    dane_code VARCHAR(5) NOT NULL UNIQUE COMMENT 'Código DANE de la ciudad',
    name VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_department (department),
    INDEX idx_dane_code (dane_code)
);
```

### Datos a insertar (ejemplos principales):

```sql
INSERT INTO cities (dane_code, name, department) VALUES
('11001', 'Bogotá, D.C.', 'Bogotá'),
('05001', 'Medellín', 'Antioquia'),
('76001', 'Cali', 'Valle del Cauca'),
('08001', 'Barranquilla', 'Atlántico'),
('13001', 'Cartagena', 'Bolívar'),
('54001', 'Cúcuta', 'Norte de Santander'),
('68001', 'Bucaramanga', 'Santander'),
('66001', 'Pereira', 'Risaralda'),
('17001', 'Manizales', 'Caldas'),
('73001', 'Ibagué', 'Tolima'),
('50001', 'Villavicencio', 'Meta'),
('63001', 'Armenia', 'Quindío');
-- ... más ciudades según necesidad
```

**Nota**: El archivo `src/data/colombianCities.js` contiene el listado completo de ciudades principales para importar a la base de datos.

## Tabla: `employees`

### Campos relacionados con documentos:

```sql
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    document_type_id INT NOT NULL COMMENT 'FK a document_types',
    document_number VARCHAR(50) NOT NULL,
    document_expedition_city_id INT COMMENT 'FK a cities - Ciudad de expedición del documento',
    
    -- Nombres
    first_name VARCHAR(100) NOT NULL,
    second_name VARCHAR(100),
    first_last_name VARCHAR(100) NOT NULL,
    second_last_name VARCHAR(100),
    
    -- Datos personales
    birth_city_id INT COMMENT 'FK a cities - Ciudad de nacimiento',
    birth_date DATE,
    profession VARCHAR(100),
    civil_status VARCHAR(50),
    email VARCHAR(100),
    gender CHAR(1),
    
    -- Dirección
    address VARCHAR(255),
    city_id INT COMMENT 'FK a cities - Ciudad de residencia',
    phone VARCHAR(20),
    
    -- Relaciones
    FOREIGN KEY (document_type_id) REFERENCES document_types(id),
    FOREIGN KEY (document_expedition_city_id) REFERENCES cities(id),
    FOREIGN KEY (birth_city_id) REFERENCES cities(id),
    FOREIGN KEY (city_id) REFERENCES cities(id),
    UNIQUE KEY unique_document (document_type_id, document_number),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Notas Importantes:

1. **Campo `codigo`**: Es diferente al `id`. Se usa específicamente para la transmisión de nómina electrónica a la DIAN.

2. **Campo `document_type_id`**: Debe referenciar el `id` de la tabla `document_types`, no el `code`.

3. **Código del tipo de documento**: El campo `code` en `document_types` es el que se usa en la transmisión electrónica (ej: '13' para CC, '22' para CE).

4. **Unicidad**: La combinación de tipo de documento y número debe ser única para evitar duplicados.

5. **Migración desde localStorage**: 
   - El campo `documentType` en localStorage actualmente guarda el `code` (ej: '13')
   - Al migrar, deberás hacer un JOIN o lookup para obtener el `id` correspondiente

## Ejemplo de consulta para transmisión electrónica:

```sql
SELECT 
    e.codigo,
    dt.code as document_type_code,
    e.document_number,
    CONCAT(e.first_name, ' ', IFNULL(e.second_name, ''), ' ', e.first_last_name, ' ', IFNULL(e.second_last_name, '')) as full_name
FROM employees e
INNER JOIN document_types dt ON e.document_type_id = dt.id
WHERE e.status = 'Activo';
```

## Validaciones recomendadas:

1. El `codigo` debe ser único en toda la base de datos
2. El `document_number` debe tener formato válido según el tipo de documento
3. Para CC: debe ser numérico y tener entre 6 y 10 dígitos
4. Para NIT: debe incluir dígito de verificación
5. Para extranjeros: validar formato según país de origen
