import React, { useState, useEffect } from 'react';
import Layout from './components/Layout/Layout';
import LoginPage from './components/Auth/LoginPage';
import CompanyList from './components/Modules/Company/CompanyList';
import { AuthProvider, useAuth } from './context/AuthContext';
import { companies as initialCompanies, employees, payrolls } from './data/mockData';

const Dashboard = ({ companiesCount, employeesCount, payrollsCount }) => {
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {/* Stats Cards */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Total Empresas</h3>
          <p className="text-gradient" style={{ fontSize: '2rem', fontWeight: 'bold' }}>{companiesCount}</p>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Total Empleados</h3>
          <p className="text-gradient" style={{ fontSize: '2rem', fontWeight: 'bold' }}>{employeesCount}</p>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Nóminas Activas</h3>
          <p className="text-gradient" style={{ fontSize: '2rem', fontWeight: 'bold' }}>{payrollsCount}</p>
        </div>
      </div>
    </>
  );
};

const AppContent = () => {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState('dashboard');

  // Initialize companies from localStorage or fallback to mock data
  const [companies, setCompanies] = useState(() => {
    const savedCompanies = localStorage.getItem('companies');
    return savedCompanies ? JSON.parse(savedCompanies) : initialCompanies;
  });

  // Save to localStorage whenever companies change
  useEffect(() => {
    localStorage.setItem('companies', JSON.stringify(companies));
  }, [companies]);

  // Initialize audit log from localStorage
  const [auditLog, setAuditLog] = useState(() => {
    const savedLog = localStorage.getItem('auditLog');
    return savedLog ? JSON.parse(savedLog) : [];
  });

  // Save audit log to localStorage
  useEffect(() => {
    localStorage.setItem('auditLog', JSON.stringify(auditLog));
  }, [auditLog]);

  if (!user) return <LoginPage />;

  const addToLog = (companyId, action, details) => {
    const newEntry = {
      id: Date.now(),
      companyId,
      user: user.email,
      action, // 'Creación' | 'Edición'
      details,
      timestamp: new Date().toISOString()
    };
    setAuditLog(prev => [newEntry, ...prev]);
  };

  const handleAddCompany = (newCompany) => {
    setCompanies([...companies, newCompany]);
    addToLog(newCompany.id, 'Creación', 'Empresa registrada en el sistema');
  };

  const handleUpdateCompany = (updatedCompany) => {
    const oldCompany = companies.find(c => c.id === updatedCompany.id);
    const changes = [];

    if (oldCompany.name !== updatedCompany.name) changes.push(`Nombre: ${oldCompany.name} -> ${updatedCompany.name}`);
    if (oldCompany.legalName !== updatedCompany.legalName) changes.push(`Razón Social: ${oldCompany.legalName || 'N/A'} -> ${updatedCompany.legalName}`);
    if (oldCompany.rfc !== updatedCompany.rfc) changes.push(`RFC: ${oldCompany.rfc || 'N/A'} -> ${updatedCompany.rfc}`);
    if (oldCompany.employerReg !== updatedCompany.employerReg) changes.push(`Reg. Patronal: ${oldCompany.employerReg || 'N/A'} -> ${updatedCompany.employerReg}`);
    if (oldCompany.address !== updatedCompany.address) changes.push(`Dirección: ${oldCompany.address} -> ${updatedCompany.address}`);

    setCompanies(companies.map(c => c.id === updatedCompany.id ? updatedCompany : c));
    if (changes.length > 0) {
      addToLog(updatedCompany.id, 'Edición', changes.join(', '));
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard
            companiesCount={companies.length}
            employeesCount={employees.length}
            payrollsCount={payrolls.filter(p => p.status === 'Pendiente').length}
          />
        );
      case 'companies':
        return (
          <CompanyList
            companies={companies}
            onAddCompany={handleAddCompany}
            onUpdateCompany={handleUpdateCompany}
            auditLog={auditLog}
          />
        );
      default:
        return (
          <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
            <h2 style={{ color: 'var(--text-secondary)' }}>Módulo en construcción</h2>
          </div>
        );
    }
  };

  return (
    <Layout currentView={currentView} onNavigate={setCurrentView}>
      {renderView()}
    </Layout>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
