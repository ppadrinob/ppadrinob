import { db } from '../config/firebase';
import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDocs,
    onSnapshot,
    query,
    where
} from 'firebase/firestore';

// --- COMPANIES ---

// Obtener empresas en tiempo real
export const subscribeToCompanies = (callback) => {
    const q = query(collection(db, 'companies'));
    return onSnapshot(q, (snapshot) => {
        const companies = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(companies);
    });
};

// Agregar empresa
export const addCompany = async (companyData) => {
    console.log("Attempting to add company:", companyData);
    if (!db) {
        console.error("Firestore DB instance is undefined!");
        throw new Error("Firestore not initialized");
    }
    try {
        const docRef = await addDoc(collection(db, 'companies'), companyData);
        console.log("Company added with ID:", docRef.id);
        return { id: docRef.id, ...companyData };
    } catch (error) {
        console.error("Error adding company: ", error);
        throw error;
    }
};

// Actualizar empresa
export const updateCompany = async (id, companyData) => {
    console.log(`Attempting to update company ${id} with data:`, companyData);
    try {
        const companyRef = doc(db, 'companies', id);
        await updateDoc(companyRef, companyData);
        console.log("Company updated successfully");
    } catch (error) {
        console.error("Error updating company: ", error);
        throw error;
    }
};

// --- EMPLOYEES ---

// Obtener empleados en tiempo real
export const subscribeToEmployees = (callback) => {
    const q = query(collection(db, 'employees'));
    return onSnapshot(q, (snapshot) => {
        const employees = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(employees);
    });
};

// Agregar empleado
export const addEmployee = async (employeeData) => {
    try {
        const docRef = await addDoc(collection(db, 'employees'), employeeData);
        return { id: docRef.id, ...employeeData };
    } catch (error) {
        console.error("Error adding employee: ", error);
        throw error;
    }
};

// Actualizar empleado
export const updateEmployee = async (id, employeeData) => {
    try {
        // Ensure ID is a string
        const stringId = String(id);
        const employeeRef = doc(db, 'employees', stringId);
        await updateDoc(employeeRef, employeeData);
    } catch (error) {
        console.error("Error updating employee: ", error);
        throw error;
    }
};

// Eliminar empleado
export const deleteEmployee = async (id) => {
    try {
        await deleteDoc(doc(db, 'employees', id));
    } catch (error) {
        console.error("Error deleting employee: ", error);
        throw error;
    }
};

// --- USERS ---
// Nota: Idealmente usar Firebase Auth, pero mantenemos la colección para roles personalizados por ahora

export const subscribeToUsers = (callback) => {
    const q = query(collection(db, 'app_users'));
    return onSnapshot(q, (snapshot) => {
        const users = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(users);
    });
};

export const addUser = async (userData) => {
    try {
        const docRef = await addDoc(collection(db, 'app_users'), userData);
        return { id: docRef.id, ...userData };
    } catch (error) {
        console.error("Error adding user: ", error);
        throw error;
    }
};

export const updateUser = async (id, userData) => {
    try {
        // Ensure ID is a string
        const stringId = String(id);
        const userRef = doc(db, 'app_users', stringId);
        await updateDoc(userRef, userData);
    } catch (error) {
        console.error("Error updating user: ", error);
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        await deleteDoc(doc(db, 'app_users', id));
    } catch (error) {
        console.error("Error deleting user: ", error);
        throw error;
    }
};

// --- AUDIT LOG ---

// Subscribe to audit log collection in real‑time
export const subscribeToAuditLog = (callback) => {
    const q = query(collection(db, 'audit_log'));
    return onSnapshot(q, (snapshot) => {
        const logs = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(logs);
    });
};

// Add a new entry to the audit log collection
export const addLogEntry = async (logEntry) => {
    try {
        const docRef = await addDoc(collection(db, 'audit_log'), logEntry);
        return { id: docRef.id, ...logEntry };
    } catch (error) {
        console.error('Error adding audit log entry:', error);
        throw error;
    }
};
// --- COST CENTERS ---

export const subscribeToCostCenters = (callback) => {
    const q = query(collection(db, 'cost_centers'));
    return onSnapshot(q, (snapshot) => {
        const centers = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(centers);
    });
};

export const addCostCenter = async (centerData) => {
    try {
        const docRef = await addDoc(collection(db, 'cost_centers'), centerData);
        return { id: docRef.id, ...centerData };
    } catch (error) {
        console.error("Error adding cost center: ", error);
        throw error;
    }
};

export const updateCostCenter = async (id, centerData) => {
    try {
        const stringId = String(id);
        const centerRef = doc(db, 'cost_centers', stringId);
        await updateDoc(centerRef, centerData);
    } catch (error) {
        console.error("Error updating cost center: ", error);
        throw error;
    }
};

export const deleteCostCenter = async (id) => {
    try {
        await deleteDoc(doc(db, 'cost_centers', id));
    } catch (error) {
        console.error("Error deleting cost center: ", error);
        throw error;
    }
};
