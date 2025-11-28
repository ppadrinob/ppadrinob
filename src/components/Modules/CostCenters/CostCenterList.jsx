import React, { useState } from 'react';
import CostCenterDetails from './CostCenterDetails';
import '../../../styles/index.css';

const CostCenterList = ({ costCenters, companies, onAdd, onUpdate, onDelete, userRole, userCompanyId, auditLog }) => {
    const [isCreating, setIsCreating] = useState(false);
    const [editingCenter, setEditingCenter] = useState(null);
    const [viewingCenter, setViewingCenter] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCompanyFilter, setSelectedCompanyFilter] = useState(userCompanyId || '');

    // Filter by company
    const accessibleCostCenters = userRole === 'super_admin'
        ? (selectedCompanyFilter ? costCenters.filter(cc => cc.companyId === selectedCompanyFilter) : costCenters)
        : costCenters.filter(cc => cc.companyId === userCompanyId);

    const filteredCenters = accessibleCostCenters.filter(cc =>
        cc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cc.code?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSave = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const centerData = {
            code: formData.get('code'),
            name: formData.get('name'),
            companyId: userRole === 'company_admin' ? userCompanyId : formData.get('companyId')
        };

        if (editingCenter) {
            onUpdate({ ...centerData, id: editingCenter.id });
            setEditingCenter(null);
        } else {
            onAdd(centerData);
            setIsCreating(false);
        }
    };

    const handleCancel = () => {
        setIsCreating(false);
        setEditingCenter(null);
        setViewingCenter(null);
    };

    const getCompanyName = (id) => {
        const company = companies.find(c => c.id === id);
        return company ? company.name : 'N/A';
    };

    // If viewing a cost center, show details
    if (viewingCenter) {
        return (
            <CostCenterDetails
                costCenter={viewingCenter}
                companies={companies}
                auditLog={auditLog}
                onClose={() => setViewingCenter(null)}
                onEdit={() => {
                    setEditingCenter(viewingCenter);
                    setViewingCenter(null);
                }}
            />
        );
    }

    // If creating or editing, show form
    if (isCreating || editingCenter) {
        return (
            <div className="glass-panel" style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
                <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    {editingCenter ? 'Editar Centro de Costo' : 'Nuevo Centro de Costo'}
                </h2>
                <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {userRole === 'super_admin' && (
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Empresa</label>
                            <select
                                name="companyId"
                                defaultValue={editingCenter?.companyId || ''}
                                required
                                style={inputStyle}
                            >
                                <option value="">Seleccionar Empresa</option>
                                {companies.map(c => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                    )}
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Código</label>
                        <input
                            type="text"
                            name="code"
                            defaultValue={editingCenter?.code || ''}
                            required
                            style={inputStyle}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Nombre</label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={editingCenter?.name || ''}
                            required
                            style={inputStyle}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                        <button
                            type="button"
                            onClick={handleCancel}
                            style={{ padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'transparent', color: 'var(--text-primary)' }}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            style={{ padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-md)', background: 'var(--primary-color)', color: 'white', fontWeight: '600' }}
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    // List view
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Centros de Costo</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Gestiona los centros de costo por empresa</p>
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
                    <span>+</span> Nuevo Centro
                </button>
            </div>

            <div className="glass-panel" style={{ padding: '1rem', marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <input
                    type="text"
                    placeholder="Buscar por nombre o código..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        flex: 1,
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-md)',
                        border: 'none',
                        background: 'rgba(255,255,255,0.05)',
                        color: 'var(--text-primary)',
                        outline: 'none',
                        minWidth: '200px'
                    }}
                />
                {userRole === 'super_admin' && (
                    <select
                        value={selectedCompanyFilter}
                        onChange={(e) => setSelectedCompanyFilter(e.target.value)}
                        style={{
                            padding: '0.75rem',
                            borderRadius: 'var(--radius-md)',
                            border: 'none',
                            background: 'rgba(255,255,255,0.05)',
                            color: 'var(--text-primary)',
                            outline: 'none',
                            minWidth: '200px'
                        }}
                    >
                        <option value="">Todas las Empresas</option>
                        {companies.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                )}
            </div>

            <div className="glass-panel" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ backgroundColor: 'var(--surface-color)' }}>
                        <tr>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Código</th>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Nombre</th>
                            {userRole === 'super_admin' && (
                                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Empresa</th>
                            )}
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCenters.length > 0 ? (
                            filteredCenters.map(center => (
                                <tr key={center.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                    <td style={{ padding: '1rem', fontFamily: 'monospace' }}>{center.code}</td>
                                    <td style={{ padding: '1rem' }}>{center.name}</td>
                                    {userRole === 'super_admin' && (
                                        <td style={{ padding: '1rem' }}>{getCompanyName(center.companyId)}</td>
                                    )}
                                    <td style={{ padding: '1rem' }}>
                                        <button
                                            onClick={() => setViewingCenter(center)}
                                            style={{ color: 'var(--primary-color)', background: 'transparent', cursor: 'pointer' }}
                                        >
                                            Ver
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={userRole === 'super_admin' ? "4" : "3"} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                                    No se encontraron centros de costo
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border-color)',
    backgroundColor: 'rgba(0,0,0,0.2)',
    color: 'var(--text-primary)',
    outline: 'none'
};

export default CostCenterList;
