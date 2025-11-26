import React, { createContext, useState, useContext, useEffect } from 'react';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                // Check if default admin exists in Firestore
                const usersRef = collection(db, 'app_users');
                const snapshot = await getDocs(usersRef);

                // If no users exist, create default admin
                if (snapshot.empty) {
                    const defaultAdmin = {
                        name: 'Admin User',
                        email: 'admin@demo.com',
                        password: 'admin123',
                        role: 'super_admin'
                    };
                    await addDoc(usersRef, defaultAdmin);
                    console.log('Default admin created in Firestore');
                }

                // Check for persisted session
                const storedUser = localStorage.getItem('payroll_user');
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error('Error initializing auth:', error);
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, []);

    const login = async (email, password) => {
        try {
            // 1. Query Firestore for user with matching email ONLY
            const usersRef = collection(db, 'app_users');
            const q = query(usersRef, where('email', '==', email));
            const snapshot = await getDocs(q);

            if (!snapshot.empty) {
                const userDoc = snapshot.docs[0];
                const userData = userDoc.data();

                // 2. Verify password (supports both plain text and hash)
                // We need to dynamically import the utility inside the function or move import to top
                // For cleaner code, I'll assume we added the import at the top. 
                // Since I can't add import easily with replace_file_content in one go if lines are far apart,
                // I will use a dynamic import here or rely on a separate step. 
                // Let's use dynamic import for safety in this block.
                const { verifyPassword, hashPassword } = await import('../utils/security');

                const { valid, isLegacy } = await verifyPassword(password, userData.password);

                if (valid) {
                    const foundUser = { id: userDoc.id, ...userData };

                    // 3. If password was legacy (plain text), update it to hash automatically
                    if (isLegacy) {
                        console.log('Migrating legacy password to hash...');
                        const newHash = await hashPassword(password);
                        const { updateDoc, doc } = await import('firebase/firestore');
                        const userRef = doc(db, 'app_users', userDoc.id);
                        await updateDoc(userRef, { password: newHash });
                    }

                    // Don't store password in session
                    const { password: _, ...userWithoutPassword } = foundUser;
                    setUser(userWithoutPassword);
                    localStorage.setItem('payroll_user', JSON.stringify(userWithoutPassword));
                    return userWithoutPassword;
                }
            }

            throw new Error('Credenciales inválidas');

        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
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
