import React from 'react';
import { documentTypes } from '../../../data/documentTypes';
import { getCitiesSorted } from '../../../data/colombianCities';
import { getBankName } from '../../../data/colombianBanks';
import { getEPSName } from '../../../data/colombianEPS';
import { getCompensationFundName } from '../../../data/colombianCompensationFunds';
import { getPensionFundName } from '../../../data/colombianPensionFunds';
import { getARLName } from '../../../data/colombianARL';
import '../../../styles/index.css';

const EmployeeDetails = ({ employee, companies, costCenters, auditLog, onClose, onEdit }) => {
    const getCompanyName = (companyId) => {
        const company = companies.find(c => c.id == companyId);
        return company ? company.name : 'N/A';
    };

    const getCostCenterName = (costCenterId) => {
        if (!costCenterId) return 'N/A';
        const center = costCenters?.find(cc => cc.id === costCenterId);
        return center ? `${center.code} - ${center.name}` : 'N/A';
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
                    <DetailField label="Expedición Documento" value={getCityName(employee.documentExpedition)} />
                    <DetailField label="Nombre Completo" value={`${employee.firstName} ${employee.secondName || ''} ${employee.firstLastName} ${employee.secondLastName || ''}`.trim()} />
                    <DetailField label="Ciudad Nacimiento" value={getCityName(employee.birthCity)} />
                    <DetailField label="Fecha Nacimiento" value={employee.birthDate} />
                    <DetailField label="Profesión" value={employee.profession} />
                    <DetailField label="Género" value={getGenderName(employee.gender)} />
                    <DetailField label="Estado Civil" value={employee.civilStatus} />
                    <DetailField label="Email" value={employee.email} />
                    <DetailField label="Teléfono" value={employee.phone} />
                    <DetailField label="Dirección" value={employee.address} />
                    <DetailField label="Ciudad Residencia" value={getCityName(employee.city)} />
                </div>
            </div>

            {/* Datos Laborales */}
            <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                <h3 style={{ color: 'var(--secondary-color)', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                    Datos Laborales
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    <DetailField label="Empresa" value={getCompanyName(employee.companyId)} />
                    <DetailField label="Centro de Costo" value={getCostCenterName(employee.costCenter)} />
                    <DetailField label="Cargo" value={employee.position} />
                    <DetailField label="Jefe" value={employee.boss} />
                    <DetailField label="Tipo de Trabajador" value={employee.workerType} />
                    <DetailField label="Subtipo de Trabajador" value={employee.workerSubtype} />
                    <DetailField label="Salario" value={`$${parseInt(employee.salary || 0).toLocaleString('es-CO')}`} />
                    <DetailField label="Salario Integral" value={employee.integralSalary ? 'Sí' : 'No'} />
                    <DetailField label="Auxilio de Transporte" value={employee.transportAllowance ? 'Sí' : 'No'} />
                    <DetailField label="Salario Promedio" value={employee.averageSalary ? 'Sí' : 'No'} />
                    <DetailField label="Método de Pago" value={employee.paymentMethod} />
                    <DetailField label="Forma de Pago" value={employee.paymentForm} />
                    <DetailField label="Fecha Ingreso" value={employee.startDate} />
                    <DetailField label="Fecha Retiro" value={employee.endDate || 'N/A'} />
                    <DetailField label="Tipo Contrato" value={employee.contractType} />
                    <DetailField label="Jornada" value={employee.workday} />
                    <DetailField label="Estado" value={employee.status} />
                    <DetailField label="Etapa" value={employee.stage} />
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

            {/* Aportes */}
            <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                    Aportes
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    <DetailField label="Salud (EPS)" value={getEPSName(employee.healthProvider)} />
                    <DetailField label="Caja Compensación" value={getCompensationFundName(employee.compensationFund)} />
                    <DetailField label="Pensión" value={getPensionFundName(employee.pensionFund)} />
                    <DetailField label="ARL" value={getARLName(employee.arl)} />
                    <DetailField label="Porcentaje ARL" value={employee.arlPercentage ? `${employee.arlPercentage}%` : 'N/A'} />
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
