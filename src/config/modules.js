export const MODULES = {
    NOMINA: {
        id: 'nomina',
        label: 'Nómina',
        submodules: [
            { id: 'employees', label: 'Empleados', path: 'employees' },
            { id: 'cost-centers', label: 'Centros de Costo', path: 'cost-centers' },
            { id: 'payroll', label: 'Nómina', path: 'payroll' },
            { id: 'reports', label: 'Reportes', path: 'reports' }
        ]
    }
};

export const DEFAULT_MODULES = ['nomina'];
