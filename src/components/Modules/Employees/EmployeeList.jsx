import React, { useState } from 'react';
import EmployeeForm from './EmployeeForm';
import '../../../styles/index.css';

const EmployeeList = ({ employees, companies, onAddEmployee, onUpdateEmployee, onDeleteEmployee, userRole, userCompanyId }) => {
    const [isCreating, setIsCreating] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Filter employees based on user role
    const accessibleEmployees = userRole === 'super_admin'
        ? employees
        : employees.filter(emp => emp.companyId == userCompanyId);

    const filteredEmployees = accessibleEmployees.filter(emp =>
        `${emp.firstName} ${emp.firstLastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.documentNumber.includes(searchTerm) ||
        emp.position?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSave = async (employeeData) => {
        try {
            if (editingEmployee) {
                await onUpdateEmployee({ ...editingEmployee, ...employeeData });
                setEditingEmployee(null);
            } else {
                await onAddEmployee({ ...employeeData, id: Date.now() });
                setIsCreating(false);
            }
        } catch (error) {
            console.error("Error saving employee:", error);
            alert("Error al guardar empleado: " + error.message);
        }
    };

    const handleCancel = () => {
        setIsCreating(false);
        setEditingEmployee(null);
    };

    const getCompanyName = (companyId) => {
        const company = companies.find(c => c.id == companyId);
        return company ? company.name : 'N/A';
    };

    if (isCreating || editingEmployee) {
        return (
            <EmployeeForm
                onSave={handleSave}
                onCancel={handleCancel}
                initialData={editingEmployee}
                companies={companies}
                userRole={userRole}
                userCompanyId={userCompanyId}
            />
        );
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Empleados</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Gestiona los empleados de la empresa</p>
                </div>
                <button
                    onClick={() => setIsCreating(true)}
                    style={{
                        padding: '0.75rem 1.5rem',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--primary-color)',
                        color: 'white',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    <span>+</span> Nuevo Empleado
                </button>
            </div>

            <div className="glass-panel" style={{ padding: '1rem', marginBottom: '1.5rem' }}>
                <input
                    type="text"
                    placeholder="Buscar por nombre, documento o cargo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-md)',
                        border: 'none',
                        background: 'transparent',
                        color: 'var(--text-primary)',
                        outline: 'none'
                    }}
                />
            </div>

            <div className="glass-panel" style={{ overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ backgroundColor: 'var(--surface-color)' }}>
                        <tr>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Documento</th>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Nombre Completo</th>
                            {userRole === 'super_admin' && (
                                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Empresa</th>
                            )}
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Cargo</th>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Salario</th>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Estado</th>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.length > 0 ? (
                            filteredEmployees.map(employee => (
                                <tr key={employee.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                    <td style={{ padding: '1rem', fontFamily: 'monospace' }}>{employee.documentNumber}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ fontWeight: '500' }}>
                                            {employee.firstName} {employee.secondName} {employee.firstLastName} {employee.secondLastName}
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{employee.email}</div>
                                    </td>
                                    {userRole === 'super_admin' && (
                                        <td style={{ padding: '1rem' }}>{getCompanyName(employee.companyId)}</td>
                                    )}
                                    <td style={{ padding: '1rem' }}>{employee.position}</td>
                                    <td style={{ padding: '1rem' }}>
                                        ${parseInt(employee.salary || 0).toLocaleString('es-CO')}
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '999px',
                                            fontSize: '0.75rem',
                                            backgroundColor: employee.status === 'Activo' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                            color: employee.status === 'Activo' ? '#4ade80' : '#f87171'
                                        }}>
                                            {employee.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <button
                                            onClick={() => setEditingEmployee(employee)}
                                            style={{ color: 'var(--primary-color)', background: 'transparent', cursor: 'pointer' }}
                                        >
                                            Editar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={userRole === 'super_admin' ? "7" : "6"} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                                    No se encontraron empleados
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeList;
