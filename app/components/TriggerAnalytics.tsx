"use client";
import React from 'react';
import { getFirebaseApp } from '../../lib/firebase/firebase';

const TriggerAnalytics = () => {
  React.useEffect(() => {
    // Aquí puedes obtener la instancia de Firebase
    const { app, auth } = getFirebaseApp();
    // Si necesitas usar `app` o `auth`, hazlo aquí
    console.log("Firebase app initialized:", app);
    console.log("Firebase Auth instance:", auth);
  }, []); // El arreglo vacío asegura que solo se ejecute una vez

  return <div></div>;
};

export default TriggerAnalytics;