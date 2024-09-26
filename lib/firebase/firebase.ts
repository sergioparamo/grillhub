import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Auth, getAuth } from "firebase/auth"; // Importa getAuth

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

  return { app, auth }; // Devuelve tanto la app como la instancia de autenticación
};

// Exporta la función para ser utilizada en otros módulos
let firebaseInstance: {
  app: FirebaseApp;
  auth: Auth;
};

export const getFirebaseApp = () => {
  if (!firebaseInstance) {
    firebaseInstance = createFirebaseApp();
  }
  return firebaseInstance;
};

export const { app, auth } = getFirebaseApp(); // Exporta la app y la auth
