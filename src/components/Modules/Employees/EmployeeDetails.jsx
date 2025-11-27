import React from 'react';
import { documentTypes } from '../../../data/documentTypes';
import { getCitiesSorted } from '../../../data/colombianCities';
import { getBankName } from '../../../data/colombianBanks';
import { getEPSName } from '../../../data/colombianEPS';
import '../../../styles/index.css';

const EmployeeDetails = ({ employee, companies, auditLog, onClose, onEdit }) => {
    const getCompanyName = (companyId) => {
        const company = companies.find(c => c.id == companyId);
        return company ? company.name : 'N/A';
    };

    const getDocumentTypeName = (code) => {
        const docType = documentTypes.find(dt => dt.code === code);
        return docType ? docType.name : code;
    };

    const getCityName = (code) => {
        if (!code) return 'N/A';
        const city = getCitiesSorted().find(c => c.code === code);
        return city ? `${city.name} - ${city.department}` : code;
    };

    const getGenderName = (code) => {
        const genders = {
            'M': 'Masculino',
            'F': 'Femenino',
            'Otro': 'Otro'
        };
        return genders[code] || code;
    };

    // Filter audit log for this employee
    const employeeLogs = auditLog
        .filter(log => log.companyId === employee.id)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return (
        <div className="glass-panel" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Detalles del Empleado</h2>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        onClick={onEdit}
                        style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: 'var(--radius-md)',
                            background: 'var(--primary-color)',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: '600'
                        }}
                    >
                        Editar
                    </button>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border-color)',
                            background: 'transparent',
                            color: 'var(--text-primary)',
                            cursor: 'pointer'
                        }}
                    >
                        Volver
                    </button>
                </div>
            </div>

            {/* Datos Generales */}
            <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                <h3 style={{ color: 'var(--primary-color)', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                    Datos Generales
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    <DetailField label="Tipo Documento" value={getDocumentTypeName(employee.documentType)} />
                    <DetailField label="Número Documento" value={employee.documentNumber} />
                    <DetailField label="Nombre Completo" value={`${employee.firstName} ${employee.secondName || ''} ${employee.firstLastName} ${employee.secondLastName || ''}`.trim()} />
                    <DetailField label="Fecha Nacimiento" value={employee.birthDate} />
                    <DetailField label="Género" value={getGenderName(employee.gender)} />
                    <DetailField label="Estado Civil" value={employee.civilStatus} />
                    <DetailField label="Email" value={employee.email} />
                    <DetailField label="Teléfono" value={employee.phone} />
                    <DetailField label="Dirección" value={employee.address} />
                    <DetailField label="Ciudad" value={getCityName(employee.city)} />
                </div>
            </div>

            {/* Datos Laborales */}
            <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                <h3 style={{ color: 'var(--secondary-color)', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                    Datos Laborales
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    <DetailField label="Empresa" value={getCompanyName(employee.companyId)} />
                    <DetailField label="Cargo" value={employee.position} />
                    <DetailField label="Salario" value={`$${parseInt(employee.salary || 0).toLocaleString('es-CO')}`} />
                    <DetailField label="Fecha Ingreso" value={employee.startDate} />
                    <DetailField label="Fecha Retiro" value={employee.endDate || 'N/A'} />
                    <DetailField label="Tipo Contrato" value={employee.contractType} />
                    <DetailField label="Estado" value={employee.status} />
                </div>
            </div>

            {/* Información Bancaria */}
            <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                <h3 style={{ color: 'var(--secondary-color)', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                    Información Bancaria
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    <DetailField label="Banco" value={getBankName(employee.bank)} />
                    <DetailField label="Tipo Cuenta" value={employee.accountType} />
                    <DetailField label="Número Cuenta" value={employee.accountNumber} />
                </div>
            </div>


            {/* Bitácora de Cambios */}
            <div className="glass-panel" style={{ padding: '1.5rem', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                    Bitácora de Cambios
                </h3>
                {employeeLogs.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {employeeLogs.map((log, index) => (
                            <div key={index} className="glass-panel" style={{ padding: '1rem', backgroundColor: 'rgba(0,0,0,0.3)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <span style={{ fontWeight: '600', color: 'var(--primary-color)' }}>{log.action}</span>
                                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                        {new Date(log.timestamp).toLocaleString('es-CO')}
                                    </span>
                                </div>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{log.details}</p>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                                    Por: {log.user}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem' }}>
                        No hay cambios registrados
                    </p>
                )}
            </div>
        </div>
    );
};

const DetailField = ({ label, value }) => (
    <div>
        <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {label}
        </label>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>{value || 'N/A'}</p>
    </div>
);

export default EmployeeDetails;
