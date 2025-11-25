import React, { useState, useEffect } from 'react';
import Layout from './components/Layout/Layout';
import LoginPage from './components/Auth/LoginPage';
import CompanyList from './components/Modules/Company/CompanyList';
import UserList from './components/Modules/Users/UserList';
import EmployeeList from './components/Modules/Employees/EmployeeList';
import { AuthProvider, useAuth } from './context/AuthContext';
import { payrolls } from './data/mockData';
import {
  subscribeToCompanies, addCompany, updateCompany,
  subscribeToEmployees, addEmployee, updateEmployee, deleteEmployee,
  subscribeToUsers, addUser, updateUser, deleteUser,
  // NEW: audit log services
  subscribeToAuditLog, addLogEntry
} from './services/firestoreService';

// Audit log state and subscription are now handled inside AppContent


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
  const { user, login } = useAuth();
  const [currentView, setCurrentView] = useState('dashboard');

  // --- STATE MANAGEMENT WITH FIREBASE ---
  const [companies, setCompanies] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [auditLog, setAuditLog] = useState([]);

  // Subscribe to Companies
  useEffect(() => {
    if (!user) return;
    const unsubscribe = subscribeToCompanies((data) => {
      setCompanies(data);
    });
    return () => unsubscribe();
  }, [user]);

  // Subscribe to Employees
  useEffect(() => {
    if (!user) return;
    const unsubscribe = subscribeToEmployees((data) => {
      setEmployees(data);
    });
    return () => unsubscribe();
  }, [user]);

  // Subscribe to Users
  useEffect(() => {
    if (!user) return;
    const unsubscribe = subscribeToUsers((data) => {
      setUsers(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user]);

  // Audit log state and real‑time subscription (inside AppContent)
  useEffect(() => {
    if (!user) return;
    const unsub = subscribeToAuditLog((data) => setAuditLog(data));
    return () => unsub();
  }, [user]);

  // If no user logged in, show login page
  if (!user) {
    return <LoginPage onLogin={login} />;
  }

  // --- HANDLERS (Async with Firebase) ---

  // Async function to add a log entry to Firestore (real‑time listener will update state)
  const addToLog = async (companyId, action, details) => {
    const entry = {
      companyId,
      user: user.email,
      action,
      details,
      timestamp: new Date().toISOString()
    };
    try {
      await addLogEntry(entry);
    } catch (e) {
      console.error('Failed to save audit log:', e);
    }
  };

  const handleAddCompany = async (newCompany) => {
    try {
      const added = await addCompany(newCompany);
      addToLog(added.id, 'Creación', 'Empresa registrada en el sistema');
      console.log("Empresa creada:", added);
      return added; // Return the created company
    } catch (error) {
      console.error('Error al crear empresa:', error);
      alert('Error al crear empresa: ' + error.message);
      throw error; // Re-throw to let the caller handle it
    }
  };

  const handleUpdateCompany = async (updatedCompany) => {
    try {
      // Clone the previous state before Firestore updates it
      const oldCompany = companies.find(c => c.id === updatedCompany.id);
      const oldCopy = oldCompany ? { ...oldCompany } : null;

      // Update in Firestore
      await updateCompany(updatedCompany.id, updatedCompany);

      // Determine what actually changed
      const changes = [];
      if (oldCopy) {
        if (oldCopy.name !== updatedCompany.name) {
          changes.push(`Nombre: ${oldCopy.name} -> ${updatedCompany.name}`);
        }
        if (oldCopy.legalName !== updatedCompany.legalName) {
          changes.push(`Razón Social: ${oldCopy.legalName || 'N/A'} -> ${updatedCompany.legalName}`);
        }
        if (oldCopy.rfc !== updatedCompany.rfc) {
          changes.push(`RFC: ${oldCopy.rfc || 'N/A'} -> ${updatedCompany.rfc}`);
        }
        if (oldCopy.employerReg !== updatedCompany.employerReg) {
          changes.push(`Registro Patronal: ${oldCopy.employerReg || 'N/A'} -> ${updatedCompany.employerReg || 'N/A'}`);
        }
        if (oldCopy.address !== updatedCompany.address) {
          changes.push(`Dirección: ${oldCopy.address || 'N/A'} -> ${updatedCompany.address || 'N/A'}`);
        }
      }

      if (changes.length > 0) {
        addToLog(updatedCompany.id, 'Edición', changes.join(', '));
      }
    } catch (error) {
      console.error('Error al actualizar empresa:', error);
      alert('Error al actualizar empresa: ' + error.message);
    }
  };

  const handleAddUser = async (newUser) => {
    try {
      await addUser(newUser);
    } catch (error) {
      alert('Error al crear usuario: ' + error.message);
    }
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      await updateUser(updatedUser.id, updatedUser);
    } catch (error) {
      alert('Error al actualizar usuario: ' + error.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      try {
        await deleteUser(userId);
      } catch (error) {
        alert('Error al eliminar usuario: ' + error.message);
      }
    }
  };

  const handleAddEmployee = async (newEmployee) => {
    try {
      await addEmployee(newEmployee);
    } catch (error) {
      alert('Error al crear empleado: ' + error.message);
    }
  };

  const handleUpdateEmployee = async (updatedEmployee) => {
    try {
      await updateEmployee(updatedEmployee.id, updatedEmployee);
    } catch (error) {
      alert('Error al actualizar empleado: ' + error.message);
    }
  };

  const handleDeleteEmployee = async (employeeId) => {
    if (window.confirm('¿Estás seguro de eliminar este empleado?')) {
      try {
        await deleteEmployee(employeeId);
      } catch (error) {
        alert('Error al eliminar empleado: ' + error.message);
      }
    }
  };

  // Filter companies based on user role
  const getAccessibleCompanies = () => {
    if (user.role === 'super_admin') {
      return companies;
    } else if (user.role === 'company_admin' && user.companyId) {
      return companies.filter(c => c.id == user.companyId);
    }
    return [];
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard
            companiesCount={getAccessibleCompanies().length}
            employeesCount={employees.length}
            payrollsCount={payrolls.filter(p => p.status === 'Pendiente').length}
          />
        );
      case 'companies':
        return (
          <CompanyList
            companies={getAccessibleCompanies()}
            onAddCompany={handleAddCompany}
            onUpdateCompany={handleUpdateCompany}
            auditLog={auditLog}
            userRole={user.role}
          />
        );
      case 'users':
        // Solo super_admin puede ver usuarios
        if (user.role !== 'super_admin') {
          return (
            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
              <h2 style={{ color: 'var(--text-secondary)' }}>Acceso denegado</h2>
            </div>
          );
        }
        return (
          <UserList
            users={users}
            companies={companies}
            onAddUser={handleAddUser}
            onUpdateUser={handleUpdateUser}
            onDeleteUser={handleDeleteUser}
          />
        );
      case 'employees':
        return (
          <EmployeeList
            employees={employees}
            companies={companies}
            onAddEmployee={handleAddEmployee}
            onUpdateEmployee={handleUpdateEmployee}
            onDeleteEmployee={handleDeleteEmployee}
            userRole={user.role}
            userCompanyId={user.companyId}
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
