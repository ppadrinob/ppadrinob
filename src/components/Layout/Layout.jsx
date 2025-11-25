import React from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/index.css';

const Layout = ({ children, currentView, onNavigate }) => {
    const { user } = useAuth();
    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
            {/* Sidebar */}
            <aside className="glass-panel" style={{ width: '260px', margin: '1rem', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <h2 className="text-gradient" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>NominaPro</h2>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <NavItem label="Dashboard" active={currentView === 'dashboard'} onClick={() => onNavigate('dashboard')} />
                    <NavItem label="Empresas" active={currentView === 'companies'} onClick={() => onNavigate('companies')} />
                    <NavItem label="Empleados" active={currentView === 'employees'} onClick={() => onNavigate('employees')} />
                    <NavItem label="Nómina" active={currentView === 'payroll'} onClick={() => onNavigate('payroll')} />
                    <NavItem label="Reportes" active={currentView === 'reports'} onClick={() => onNavigate('reports')} />
                    {user?.role === 'super_admin' && (
                        <NavItem label="Usuarios" active={currentView === 'users'} onClick={() => onNavigate('users')} />
                    )}
                </nav>

                <div style={{ marginTop: 'auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--surface-color)' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--primary-color)' }}></div>
                        <div style={{ flex: 1 }}>
                            <p style={{ fontSize: '0.875rem', fontWeight: '500' }}>{user?.name}</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{user?.email}</p>
                        </div>
                        <button
                            onClick={() => {
                                localStorage.removeItem('payroll_user');
                                window.location.reload();
                            }}
                            style={{ color: 'var(--text-secondary)', background: 'transparent', fontSize: '1.2rem' }}
                            title="Cerrar Sesión"
                        >
                            ⏻
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
                <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>Dashboard</h1>
                    <button className="glass-panel" style={{ padding: '0.5rem 1rem', color: 'var(--text-primary)' }}>
                        Notificaciones
                    </button>
                </header>
                {children}
            </main>
        </div>
    );
};

const NavItem = ({ label, active, onClick }) => (
    <button
        onClick={onClick}
        style={{
            width: '100%',
            textAlign: 'left',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-md)',
            color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
            backgroundColor: active ? 'var(--primary-color)' : 'transparent',
            transition: 'var(--transition-fast)',
            display: 'block',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem'
        }}
    >
        {label}
    </button>
);

export default Layout;
