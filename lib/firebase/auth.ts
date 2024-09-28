// auth.js
import { getFirebaseApp } from './firebase'; // Asegúrate de la ruta correcta

const { auth } = getFirebaseApp(); // Llama a la función para obtener auth

// Ahora puedes usar 'auth' para tus métodos de autenticación
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const registerWithEmail = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const loginWithEmail = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
    return signOut(auth);
};