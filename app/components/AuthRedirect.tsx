"use client"; // Asegúrate de que esta línea esté aquí
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getFirebaseApp } from '../../lib/firebase/firebase';

const { auth } = getFirebaseApp(); // Obtén la instancia de autenticación

const AuthRedirect = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [isRedirecting, setIsRedirecting] = useState(true); // Correctly declare the state variable

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/auth'); // Redirige a la página de inicio de sesión si no hay usuario autenticado
      } else {
        setIsRedirecting(false); // Si el usuario está autenticado, permite el renderizado
      }
    }
  }, [user, loading, router]);

  if (isRedirecting || loading) return null; // Optionally show nothing while redirecting or loading

  return null; // No renderiza nada si está en proceso de redirección
};

export default AuthRedirect;