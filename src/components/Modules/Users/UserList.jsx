import React, { useState } from 'react';
import UserForm from './UserForm';
import UserDetails from './UserDetails';
import '../../../styles/index.css';

const UserList = ({ users, companies, onAddUser, onUpdateUser, onDeleteUser, auditLog }) => {
    const [isCreating, setIsCreating] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [viewingUser, setViewingUser] = useState(null);

    const handleSave = async (userData) => {
        try {
            if (editingUser) {
                await onUpdateUser({ ...editingUser, ...userData });
                setEditingUser(null);
            } else {
                // Don't add id - Firestore will generate it
                await onAddUser(userData);
                setIsCreating(false);
            }
        } catch (error) {
            console.error('Error saving user:', error);
            alert('Error al guardar usuario: ' + error.message);
        }
    };

    const handleCancel = () => {
        setIsCreating(false);
        setEditingUser(null);
        setViewingUser(null);
    };

    if (isCreating || editingUser) {
        return <UserForm onSave={handleSave} onCancel={handleCancel} initialData={editingUser} companies={companies} />;
    }

    if (viewingUser) {
        return <UserDetails user={viewingUser} onClose={handleCancel} auditLog={auditLog} companies={companies} />;
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Usuarios</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Gestiona el acceso al sistema</p>
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
                    <span>+</span> Nuevo Usuario
                </button>
            </div>

            <div className="glass-panel" style={{ overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ backgroundColor: 'var(--surface-color)' }}>
                        <tr>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Usuario</th>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Rol</th>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Empresa Asignada</th>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => {
                            const assignedCompany = companies.find(c => c.id == user.companyId);
                            return (
                                <tr key={user.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ fontWeight: '500' }}>{user.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{user.email}</div>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '999px',
                                            fontSize: '0.75rem',
                                            backgroundColor: user.role === 'super_admin' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                                            color: user.role === 'super_admin' ? '#a78bfa' : '#60a5fa'
                                        }}>
                                            {user.role === 'super_admin' ? 'Super Admin' : 'Admin Empresa'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        {user.role === 'company_admin' ? (assignedCompany?.name || 'No asignada') : '-'}
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <button
                                            onClick={() => setViewingUser(user)}
                                            style={{ color: 'var(--text-primary)', background: 'transparent', marginRight: '1rem', cursor: 'pointer' }}
                                            title="Ver Detalles"
                                        >👁️</button>
                                        <button
                                            onClick={() => setEditingUser(user)}
                                            style={{ color: 'var(--primary-color)', background: 'transparent', marginRight: '1rem', cursor: 'pointer' }}
                                        >
                                            Editar
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserList;
