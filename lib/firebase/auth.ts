import { getFirebaseApp } from "./firebase"; // Asegúrate de tener el path correcto
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { login, logout } from "@/app/store/authSlice"; // Importamos la acción login del authSlice
import { User } from "@/app/models/User"; // Asegúrate de tener el path correcto
import { AppDispatch } from "@/app/store/store"; // Importar el tipo de dispatch

const { auth } = getFirebaseApp(); // Obtener la instancia de autenticación de Firebase

export const registerWithEmail = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  phone: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Mapeamos los datos del usuario a la interfaz User
    const userData: User = {
      firstName,
      lastName,
      email,
      profileImageUrl: user.photoURL || "",
      phone,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      eventsOrganized: [],
      eventsAttended: [],
    };

    // Llamamos a la API para guardar el usuario en la base de datos
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }), // Enviar los datos necesarios, incluyendo el password
    });

    if (!response.ok) {
      throw new Error("Failed to register user in the database");
    }

    return { user, message: "User registered successfully!" };
  } catch (error) {
    console.error("Registration error:", (error as Error).message);
    throw new Error((error as Error).message || "Failed to register user");
  }
};

export const loginWithEmail = async (
  dispatch: AppDispatch,
  email: string,
  password: string
) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const uid = user.uid;

    // Call the API to get user details
    const response = await fetch(`/api/user/${uid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the response is OK
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const userData = await response.json(); // Parse the JSON response
    
    // Dispatch the action login to the store with user data
    dispatch(login({ uid, user: userData }));

    return { user, message: "Login successful!" };
  } catch (error) {
    console.error("Login error:", (error as Error).message);
    throw new Error((error as Error).message || "Failed to login");
  }
};

// Renaming the function to avoid confusion
export const performLogout = async (dispatch: AppDispatch) => {
  try {
    await signOut(auth);
    dispatch(logout());
  } catch (error) {
    console.error("Error during logout:", (error as Error).message);
    throw new Error((error as Error).message || "Failed to log out");
  }
};
