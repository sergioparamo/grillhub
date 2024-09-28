import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Auth, getAuth } from "firebase/auth"; // Importa getAuth
import { getDatabase } from "firebase/database"; // Importa getDatabase

export const createFirebaseApp = () => {
  const clientCredentials = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };

  // Inicializa Firebase
  const app =
    getApps().length > 0 ? getApps()[0] : initializeApp(clientCredentials);

  // Inicializa Firebase Analytics
  if (typeof window !== "undefined" && clientCredentials.measurementId) {
    getAnalytics(app);
  }

  // Inicializa Firebase Authentication
  const auth = getAuth(app); // Obtiene la instancia de autenticación

  // Inicializa Firebase Realtime Database
  const database = getDatabase(app); // Obtiene la instancia de la base de datos

  return { app, auth, database }; // Devuelve tanto la app, la instancia de autenticación como la base de datos
};

// Exporta la función para ser utilizada en otros módulos
let firebaseInstance: {
  app: FirebaseApp;
  auth: Auth;
  database: ReturnType<typeof getDatabase>; // Tipo de la instancia de la base de datos
};

export const getFirebaseApp = () => {
  if (!firebaseInstance) {
    firebaseInstance = createFirebaseApp();
  }
  return firebaseInstance;
};

export const { app, auth, database } = getFirebaseApp(); // Exporta la app, la auth y la base de datos