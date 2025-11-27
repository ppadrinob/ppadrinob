import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/index.css';
import { MODULES } from '../../config/modules';

const Layout = ({ children, currentView, onNavigate, userCompany }) => {
    const { user } = useAuth();
    const [expandedModules, setExpandedModules] = useState({});

    const toggleModule = (moduleId) => {
        setExpandedModules(prev => ({
            ...prev,
            [moduleId]: !prev[moduleId]
        }));
    };
    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
            {/* Sidebar */}
            <aside className="glass-panel" style={{ width: '260px', margin: '1rem', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <h2 className="text-gradient" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>NominaPro</h2>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <NavItem label="Dashboard" active={currentView === 'dashboard'} onClick={() => onNavigate('dashboard')} />

                    {user?.role === 'super_admin' && (
                        <>
                            <NavItem label="Empresas" active={currentView === 'companies'} onClick={() => onNavigate('companies')} />
                            <NavItem label="Usuarios" active={currentView === 'users'} onClick={() => onNavigate('users')} />
                        </>
                    )}

                    {(userCompany?.activeModules || (userCompany ? ['nomina'] : [])).map(moduleId => {
                        const moduleConfig = Object.values(MODULES).find(m => m.id === moduleId);
                        if (!moduleConfig) return null;

                        const isExpanded = expandedModules[moduleId];

                        return (
                            <div key={moduleId} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                <button
                                    onClick={() => toggleModule(moduleId)}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '0.75rem 1rem',
                                        color: 'var(--text-secondary)',
                                        fontSize: '0.875rem',
                                        fontWeight: '600',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        marginTop: '0.5rem',
                                        background: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer',
                                        width: '100%',
                                        textAlign: 'left',
                                        transition: 'color 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
                                    onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
                                >
                                    {moduleConfig.label}
                                    <span style={{ fontSize: '0.75rem' }}>{isExpanded ? '▼' : '▶'}</span>
                                </button>

                                {isExpanded && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                        {moduleConfig.submodules.map(sub => (
                                            <NavItem
                                                key={sub.id}
                                                label={sub.label}
                                                active={currentView === sub.path}
                                                onClick={() => onNavigate(sub.path)}
                                                style={{ paddingLeft: '2rem', fontSize: '0.95rem' }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
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
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>
                        {currentView === 'dashboard' ? 'Dashboard' :
                            currentView === 'companies' ? 'Empresas' :
                                currentView === 'users' ? 'Usuarios' :
                                    // Try to find the label in modules
                                    Object.values(MODULES).flatMap(m => m.submodules).find(s => s.path === currentView)?.label || 'Dashboard'}
                    </h1>
                    <button className="glass-panel" style={{ padding: '0.5rem 1rem', color: 'var(--text-primary)' }}>
                        Notificaciones
                    </button>
                </header>
                {children}
            </main>
        </div>
    );
};

const NavItem = ({ label, active, onClick, style }) => (
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
            fontSize: '1rem',
            ...style
        }}
    >
        {label}
    </button>
);

export default Layout;
