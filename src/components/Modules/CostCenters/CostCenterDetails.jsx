import React from 'react';
import '../../../styles/index.css';

const CostCenterDetails = ({ costCenter, companies, auditLog, onClose, onEdit }) => {
    const getCompanyName = (companyId) => {
        const company = companies.find(c => c.id === companyId);
        return company ? company.name : 'N/A';
    };

    // Filter audit log for this cost center using targetId
    const centerLogs = auditLog
        .filter(log => log.targetId === costCenter.id)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return (
        <div className="glass-panel" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Detalles del Centro de Costo</h2>
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

            {/* Información del Centro de Costo */}
            <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                <h3 style={{ color: 'var(--primary-color)', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                    Información General
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    <DetailField label="Código" value={costCenter.code} />
                    <DetailField label="Nombre" value={costCenter.name} />
                    <DetailField label="Empresa" value={getCompanyName(costCenter.companyId)} />
                </div>
            </div>

            {/* Bitácora de Cambios */}
            <div className="glass-panel" style={{ padding: '1.5rem', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                    Bitácora de Cambios
                </h3>
                {centerLogs.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {centerLogs.map((log, index) => (
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

export default CostCenterDetails;
