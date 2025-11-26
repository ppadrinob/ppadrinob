import React, { useState, useEffect } from 'react';
import '../../../styles/index.css';

const UserForm = ({ onSave, onCancel, initialData, companies }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'company_admin',
        companyId: ''
    });

    // Estados para manejo de contraseñas en edición
    const [passwordFields, setPasswordFields] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        password: '' // Para creación de usuario nuevo
    });

    const [error, setError] = useState('');

    useEffect(() => {
        if (initialData) {
            // Security: Don't load the password into the form state
            const { password, ...rest } = initialData;
            setFormData(rest);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (['currentPassword', 'newPassword', 'confirmPassword', 'password'].includes(name)) {
            setPasswordFields(prev => ({ ...prev, [name]: value }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
        setError(''); // Limpiar errores al escribir
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const dataToSave = { ...formData };

        if (initialData) {
            // Lógica de EDICIÓN
            if (passwordFields.newPassword) {
                // 1. Validar que se ingresó la contraseña actual
                if (!passwordFields.currentPassword) {
                    setError('Debes ingresar tu contraseña actual para establecer una nueva.');
                    return;
                }

                // 2. Validar coincidencia de nuevas contraseñas
                if (passwordFields.newPassword !== passwordFields.confirmPassword) {
                    setError('Las nuevas contraseñas no coinciden.');
                    return;
                }

                // 3. Verificar contraseña actual
                try {
                    // Import dinámico para asegurar que cargue
                    const { verifyPassword } = await import('../../../utils/security');

                    const { valid } = await verifyPassword(passwordFields.currentPassword, initialData.password);

                    if (!valid) {
                        setError('La contraseña actual es incorrecta.');
                        return;
                    }

                    // Si todo es válido, asignamos la nueva contraseña
                    dataToSave.password = passwordFields.newPassword;

                } catch (err) {
                    console.error('Error verifying password:', err);
                    setError('Error al verificar la contraseña. Intente de nuevo.');
                    return;
                }
            }
        } else {
            // Lógica de CREACIÓN
            if (!passwordFields.password) {
                setError('La contraseña es obligatoria.');
                return;
            }
            dataToSave.password = passwordFields.password;
        }

        onSave(dataToSave);
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

    return (
        <div className="glass-panel" style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
                {initialData ? 'Editar Usuario' : 'Nuevo Usuario'}
            </h2>

            {error && (
                <div style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.2)',
                    color: '#fca5a5',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '1rem',
                    fontSize: '0.875rem'
                }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Nombre</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={inputStyle}
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
                        style={inputStyle}
                    />
                </div>

                {/* Sección de Contraseñas */}
                {initialData ? (
                    <div style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '1rem 0', margin: '0.5rem 0' }}>
                        <h3 style={{ fontSize: '1rem', color: 'var(--primary-color)', marginBottom: '1rem' }}>Cambiar Contraseña</h3>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Contraseña Actual</label>
                            <input
                                type="password"
                                name="currentPassword"
                                value={passwordFields.currentPassword}
                                onChange={handleChange}
                                placeholder="Requerido para cambiar clave"
                                style={inputStyle}
                            />
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Nueva Contraseña</label>
                            <input
                                type="password"
                                name="newPassword"
                                value={passwordFields.newPassword}
                                onChange={handleChange}
                                placeholder="Dejar vacío para no cambiar"
                                style={inputStyle}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Confirmar Nueva Contraseña</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={passwordFields.confirmPassword}
                                onChange={handleChange}
                                placeholder="Repetir nueva contraseña"
                                style={inputStyle}
                            />
                        </div>
                    </div>
                ) : (
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            value={passwordFields.password}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                    </div>
                )}

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Rol</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        style={inputStyle}
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
                            style={inputStyle}
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
