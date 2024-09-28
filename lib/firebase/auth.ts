// auth.js
import { getFirebaseApp } from './firebase'; // Ensure the correct path
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const { auth } = getFirebaseApp(); // Get the auth instance

export const registerWithEmail = async (firstName: string, lastName: string, email: string, password: string, phone?: string) => {
    try {
        // First, create the user with Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const uid = user.uid;

        // Then, call the API to save the user to the Realtime Database
        const response = await fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstName, lastName, email, password, phone, uid }) // Send the necessary data
        });

        if (!response.ok) {
            throw new Error('Failed to register user in the database');
        }

        return { user, message: 'User registered successfully!' };
    } catch (error) {
        console.error('Registration error:', (error as Error).message);
        throw new Error((error as Error).message || 'Failed to register user');
    }
};

export const loginWithEmail = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
    return signOut(auth);
};