export const companies = [
  { id: 1, name: 'Tech Solutions Inc.', legalName: 'Tech Solutions S.A. de C.V.', rfc: 'TSI123456789', employerReg: 'Y12345', address: 'Av. Tecnológico 123', employees: 12 },
  { id: 2, name: 'Green Valley Agro', legalName: 'Green Valley Agro S.P.R. de R.L.', rfc: 'GVA987654321', employerReg: 'Z98765', address: 'Camino Real 456', employees: 45 },
  { id: 3, name: 'Urban Construct', legalName: 'Urban Construct S.A.', rfc: 'UBC456123789', employerReg: 'X45678', address: 'Calle 5 de Mayo 789', employees: 8 },
];

export const employees = [
  { id: 101, companyId: 1, name: 'Ana García', position: 'Desarrollador Senior', salary: 45000, status: 'Activo' },
  { id: 102, companyId: 1, name: 'Carlos López', position: 'Diseñador UI/UX', salary: 38000, status: 'Activo' },
  { id: 201, companyId: 2, name: 'María Rodríguez', position: 'Gerente de Ventas', salary: 52000, status: 'Activo' },
  { id: 202, companyId: 2, name: 'Juan Pérez', position: 'Operador de Maquinaria', salary: 18000, status: 'Inactivo' },
];

export const payrolls = [
  { id: 1, companyId: 1, period: '2023-10-01 - 2023-10-15', total: 83000, status: 'Pagado' },
  { id: 2, companyId: 2, period: '2023-10-01 - 2023-10-15', total: 70000, status: 'Pendiente' },
];
