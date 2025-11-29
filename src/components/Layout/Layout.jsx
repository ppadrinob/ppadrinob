import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/index.css';
import { MODULES } from '../../config/modules';

const Layout = ({ children, currentView, onNavigate, userCompany }) => {
    const { user } = useAuth();
    const [expandedModules, setExpandedModules] = useState({});
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleModule = (moduleId) => {
        setExpandedModules(prev => ({
            ...prev,
            [moduleId]: !prev[moduleId]
        }));
    };

    const handleNavigate = (path) => {
        onNavigate(path);
        setIsSidebarOpen(false); // Close sidebar on mobile after navigation
    };

    return (
        <div className="layout-container">
            {/* Mobile Overlay */}
            <div
                className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`}
                onClick={() => setIsSidebarOpen(false)}
            />

            {/* Sidebar */}
            <aside className={`glass-panel sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 className="text-gradient" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>NominaPro</h2>
                    <button
                        className="menu-toggle"
                        onClick={() => setIsSidebarOpen(false)}
                        style={{ background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, overflowY: 'auto' }}>
                    <NavItem label="Dashboard" active={currentView === 'dashboard'} onClick={() => handleNavigate('dashboard')} />

                    {user?.role === 'super_admin' && (
                        <>
                            <NavItem label="Empresas" active={currentView === 'companies'} onClick={() => handleNavigate('companies')} />
                            <NavItem label="Usuarios" active={currentView === 'users'} onClick={() => handleNavigate('users')} />
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
                                                onClick={() => handleNavigate(sub.path)}
                                                style={{ paddingLeft: '2rem', fontSize: '0.95rem' }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>

                <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--surface-color)' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--primary-color)' }}></div>
                        <div style={{ flex: 1, overflow: 'hidden' }}>
                            <p style={{ fontSize: '0.875rem', fontWeight: '500', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name}</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.email}</p>
                        </div>
                        <button
                            onClick={() => {
                                localStorage.removeItem('payroll_user');
                                window.location.reload();
                            }}
                            style={{ color: 'var(--text-secondary)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            title="Cerrar Sesión"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                                <line x1="12" y1="2" x2="12" y2="12"></line>
                            </svg>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <header style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center' }}>
                    <button
                        className="menu-toggle"
                        onClick={() => setIsSidebarOpen(true)}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', color: 'var(--text-primary)' }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>

                    <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>
                            {currentView === 'dashboard' ? 'Dashboard' :
                                currentView === 'companies' ? 'Empresas' :
                                    currentView === 'users' ? 'Usuarios' :
                                        // Try to find the label in modules
                                        Object.values(MODULES).flatMap(m => m.submodules).find(s => s.path === currentView)?.label || 'Dashboard'}
                        </h1>
                        <button className="glass-panel" style={{ padding: '0.5rem 1rem', color: 'var(--text-primary)', display: 'none' }}>
                            {/* Hidden on mobile for now to save space, or can be icon only */}
                            Notificaciones
                        </button>
                    </div>
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
