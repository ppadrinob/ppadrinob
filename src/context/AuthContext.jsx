import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Inicializar usuarios si no existen
        const storedUsers = localStorage.getItem('app_users');
        if (!storedUsers) {
            const defaultAdmin = {
                id: 1,
                name: 'Admin User',
                email: 'admin@demo.com',
                password: 'admin123',
                role: 'super_admin'
            };
            localStorage.setItem('app_users', JSON.stringify([defaultAdmin]));
        }

        // Simular persistencia de sesión
        const storedUser = localStorage.getItem('payroll_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const users = JSON.parse(localStorage.getItem('app_users') || '[]');
                const foundUser = users.find(u => u.email === email && u.password === password);

                if (foundUser) {
                    const { password, ...userWithoutPassword } = foundUser; // No guardar password en sesión
                    setUser(userWithoutPassword);
                    localStorage.setItem('payroll_user', JSON.stringify(userWithoutPassword));
                    resolve(userWithoutPassword);
                } else {
                    reject(new Error('Credenciales inválidas'));
                }
            }, 800);
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
