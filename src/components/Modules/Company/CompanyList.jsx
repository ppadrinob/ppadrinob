import React, { useState } from 'react';
import CompanyForm from './CompanyForm';
import CompanyDetails from './CompanyDetails';
import '../../../styles/index.css';

const CompanyList = ({ companies, onAddCompany, onUpdateCompany, auditLog, userRole }) => {
    // UI state
    const [isCreating, setIsCreating] = useState(false);
    const [editingCompany, setEditingCompany] = useState(null);
    const [viewingCompany, setViewingCompany] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Filter list by search term
    const filteredCompanies = companies.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.rfc.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // -------------------------------------------------
    // Handlers (async, with logging for debugging)
    // -------------------------------------------------
    const handleSave = async (companyData) => {
        try {
            if (editingCompany) {
                console.log('Updating company with ID:', editingCompany.id);
                console.log('Data to update:', companyData);
                const merged = { ...editingCompany, ...companyData };
                console.log('Merged data:', merged);
                await onUpdateCompany(merged);
                setEditingCompany(null);
            } else {
                // onAddCompany returns the created document (including its Firestore ID)
                const created = await onAddCompany({ ...companyData, employees: 0 });
                console.log('Company created with Firestore ID:', created.id);
                setIsCreating(false);
            }
        } catch (error) {
            console.error('Error saving company:', error);
            alert('Error al guardar empresa: ' + (error?.message || error));
        }
    };

    const handleCancel = () => {
        setIsCreating(false);
        setEditingCompany(null);
        setViewingCompany(null);
    };

    // -------------------------------------------------
    // Conditional rendering
    // -------------------------------------------------
    if (isCreating || editingCompany) {
        return <CompanyForm onSave={handleSave} onCancel={handleCancel} initialData={editingCompany} />;
    }

    if (viewingCompany) {
        return <CompanyDetails company={viewingCompany} auditLog={auditLog} onClose={handleCancel} />;
    }

    // -------------------------------------------------
    // Main list UI
    // -------------------------------------------------
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Empresas</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Gestiona las empresas registradas en el sistema</p>
                </div>
                {userRole === 'super_admin' && (
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
                        <span>+</span> Nueva Empresa
                    </button>
                )}
            </div>

            <div className="glass-panel" style={{ padding: '1rem', marginBottom: '1.5rem' }}>
                <input
                    type="text"
                    placeholder="Buscar empresa por nombre o RFC..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
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
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Nombre Comercial</th>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '500' }}>RFC</th>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Empleados</th>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCompanies.length > 0 ? (
                            filteredCompanies.map(company => (
                                <tr key={company.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ fontWeight: '500' }}>{company.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{company.legalName || company.name}</div>
                                    </td>
                                    <td style={{ padding: '1rem', fontFamily: 'monospace' }}>{company.rfc}</td>
                                    <td style={{ padding: '1rem' }}>{company.employees}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <button
                                            onClick={() => setViewingCompany(company)}
                                            style={{ color: 'var(--text-primary)', background: 'transparent', marginRight: '1rem', cursor: 'pointer' }}
                                            title="Ver Detalles"
                                        >👁️</button>
                                        {userRole === 'super_admin' && (
                                            <button
                                                onClick={() => setEditingCompany(company)}
                                                style={{ color: 'var(--primary-color)', background: 'transparent', marginRight: '1rem', cursor: 'pointer' }}
                                            >Editar</button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No se encontraron empresas</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CompanyList;
