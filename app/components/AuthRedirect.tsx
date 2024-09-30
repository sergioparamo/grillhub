// components/AuthRedirect.tsx

"use client"; // Ensure this is a client component
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getFirebaseApp } from '../../lib/firebase/firebase';

const { auth } = getFirebaseApp(); // Get the auth instance

const AuthRedirect = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    const checkUser = async () => {
      if (!loading) {
        if (!user) {
          // If there's no user, redirect to the auth page
          router.replace('/auth');
        }
      }
    };

    checkUser();
  }, [user, loading, router]);

  // Optionally show a loading spinner or nothing while redirecting
  if (loading) return <div>Loading...</div>; // You can replace this with your Spinner component

  return null; // Render nothing if checking is done
};

export default AuthRedirect;