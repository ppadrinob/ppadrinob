import React, { useState, useEffect } from 'react';
import '../../../styles/index.css';

const UserForm = ({ onSave, onCancel, initialData, companies }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'company_admin',
        companyId: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="glass-panel" style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
                {initialData ? 'Editar Usuario' : 'Nuevo Usuario'}
            </h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Nombre</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border-color)',
                            backgroundColor: 'rgba(0,0,0,0.2)',
                            color: 'var(--text-primary)',
                            outline: 'none'
                        }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border-color)',
                            backgroundColor: 'rgba(0,0,0,0.2)',
                            color: 'var(--text-primary)',
                            outline: 'none'
                        }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required={!initialData}
                        placeholder={initialData ? "Dejar en blanco para mantener actual" : ""}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border-color)',
                            backgroundColor: 'rgba(0,0,0,0.2)',
                            color: 'var(--text-primary)',
                            outline: 'none'
                        }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Rol</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border-color)',
                            backgroundColor: 'rgba(0,0,0,0.2)',
                            color: 'var(--text-primary)',
                            outline: 'none'
                        }}
                    >
                        <option value="super_admin">Super Administrador</option>
                        <option value="company_admin">Administrador de Empresa</option>
                    </select>
                </div>

                {formData.role === 'company_admin' && (
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Empresa Asignada</label>
                        <select
                            name="companyId"
                            value={formData.companyId}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--border-color)',
                                backgroundColor: 'rgba(0,0,0,0.2)',
                                color: 'var(--text-primary)',
                                outline: 'none'
                            }}
                        >
                            <option value="">Seleccionar Empresa...</option>
                            {companies.map(company => (
                                <option key={company.id} value={company.id}>{company.name}</option>
                            ))}
                        </select>
                    </div>
                )}

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button
                        type="button"
                        onClick={onCancel}
                        style={{
                            flex: 1,
                            padding: '0.75rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border-color)',
                            background: 'transparent',
                            color: 'var(--text-primary)',
                            cursor: 'pointer'
                        }}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        style={{
                            flex: 1,
                            padding: '0.75rem',
                            borderRadius: 'var(--radius-md)',
                            background: 'var(--primary-color)',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: '600'
                        }}
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserForm;
