import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simular persistencia de sesión
        const storedUser = localStorage.getItem('payroll_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Simulación de validación contra "base de datos"
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email === 'admin@demo.com' && password === 'admin123') {
                    const userData = { name: 'Admin User', email, role: 'admin' };
                    setUser(userData);
                    localStorage.setItem('payroll_user', JSON.stringify(userData));
                    resolve(userData);
                } else {
                    reject(new Error('Credenciales inválidas'));
                }
            }, 800); // Simular delay de red
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('payroll_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
