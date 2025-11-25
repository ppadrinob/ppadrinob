// Firebase Configuration
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCEKgyUutq_Jr2TCbdNIk_6Slvg-vJ8IuY",
    authDomain: "payroll-admin-22606.firebaseapp.com",
    projectId: "payroll-admin-22606",
    storageBucket: "payroll-admin-22606.firebasestorage.app",
    messagingSenderId: "828877835628",
    appId: "1:828877835628:web:871fdf8009c96698de3749"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
