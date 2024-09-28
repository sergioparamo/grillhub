"use client"; // Ensure this is a client component
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { getFirebaseApp } from "../../lib/firebase/firebase"; // Adjust the path if necessary

const AuthStatus = () => {
  const { auth } = getFirebaseApp();
  const [user, setUser] = useState<User | null>(null); // Aceptar User o null

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe(); // Cleanup subscription
  }, [auth]);

 

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.email}!</p>
        </div>
      ) : (
        <p>Please log in.</p>
      )}
    </div>
  );
};

export default AuthStatus;