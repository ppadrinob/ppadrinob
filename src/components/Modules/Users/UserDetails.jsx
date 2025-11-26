import React from 'react';
import '../../../styles/index.css';

const UserDetails = ({ user, onClose, auditLog, companies }) => {
    if (!user) return null;

    const assignedCompany = companies.find(c => c.id == user.companyId);

    // Filter logs for this user (using companyId field as generic targetId for now)
    const userLogs = auditLog
        ? auditLog
            .filter(log => log.companyId === user.id)
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        : [];

    return (
        <div className="glass-panel" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '2rem' }}>
                <div>
                    <h2 className="text-gradient" style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{user.name}</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>Detalles del Usuario</p>
                </div>
                <button
                    onClick={onClose}
                    style={{
                        background: 'rgba(255,255,255,0.1)',
                        border: 'none',
                        color: 'var(--text-primary)',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    ✕
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                {/* Información General */}
                <div className="glass-panel" style={{ padding: '1.5rem', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                    <h3 style={{ color: 'var(--primary-color)', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Información de Cuenta</h3>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Email</label>
                        <p style={{ fontSize: '1rem' }}>{user.email}</p>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Rol</label>
                        <span style={{
                            padding: '0.25rem 0.75rem',
                            borderRadius: '999px',
                            fontSize: '0.875rem',
                            backgroundColor: user.role === 'super_admin' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                            color: user.role === 'super_admin' ? '#a78bfa' : '#60a5fa'
                        }}>
                            {user.role === 'super_admin' ? 'Super Admin' : 'Admin Empresa'}
                        </span>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>ID Sistema</label>
                        <p style={{ fontSize: '1rem', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>#{user.id}</p>
                    </div>
                </div>

                {/* Asignación */}
                <div className="glass-panel" style={{ padding: '1.5rem', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                    <h3 style={{ color: 'var(--secondary-color)', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Asignación</h3>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Empresa Asignada</label>
                        <p style={{ fontSize: '1rem', lineHeight: '1.6' }}>
                            {user.role === 'company_admin' ? (assignedCompany?.name || 'No asignada') : 'N/A (Super Admin)'}
                        </p>
                    </div>
                </div>

                {/* Bitácora de Cambios */}
                <div className="glass-panel" style={{ padding: '1.5rem', backgroundColor: 'rgba(0,0,0,0.2)', gridColumn: '1 / -1' }}>
                    <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Bitácora de Cambios</h3>

                    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {userLogs.length > 0 ? (
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                                <thead>
                                    <tr style={{ color: 'var(--text-secondary)', textAlign: 'left' }}>
                                        <th style={{ padding: '0.5rem' }}>Fecha</th>
                                        <th style={{ padding: '0.5rem' }}>Usuario (Autor)</th>
                                        <th style={{ padding: '0.5rem' }}>Acción</th>
                                        <th style={{ padding: '0.5rem' }}>Detalles</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userLogs.map(log => (
                                        <tr key={log.id} style={{ borderTop: '1px solid var(--border-color)' }}>
                                            <td style={{ padding: '0.5rem', color: 'var(--text-secondary)' }}>{new Date(log.timestamp).toLocaleString()}</td>
                                            <td style={{ padding: '0.5rem' }}>{log.user}</td>
                                            <td style={{ padding: '0.5rem' }}>
                                                <span style={{
                                                    padding: '0.25rem 0.5rem',
                                                    borderRadius: '4px',
                                                    backgroundColor: log.action === 'Creación' ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 165, 0, 0.1)',
                                                    color: log.action === 'Creación' ? '#4ade80' : '#fbbf24',
                                                    fontSize: '0.75rem'
                                                }}>
                                                    {log.action}
                                                </span>
                                            </td>
                                            <td style={{ padding: '0.5rem' }}>{log.details}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>No hay registros de cambios para este usuario.</p>
                        )}
                    </div>
                </div>

            </div>

            <div style={{ marginTop: '2rem', textAlign: 'right' }}>
                <button
                    onClick={onClose}
                    style={{
                        padding: '0.75rem 1.5rem',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--primary-color)',
                        color: 'white',
                        fontWeight: '600'
                    }}
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default UserDetails;
