// app/profile/page.tsx
"use client";
import React, { useEffect, useState } from "react"; // Import necessary hooks
import { Container, Paper, Typography } from "@mui/material";
import Profile from "../components/Profile";
import { getFirebaseApp } from "../../lib/firebase/firebase";
import Header from "../components/Header";
import { useAuthState } from "react-firebase-hooks/auth";

const ProfilePage = () => {
  const [userDb, setUserDb] = useState(null); // State to hold user data
  const [loading, setLoading] = useState(true); // State to handle loading

  //get auth 
  const { auth } = getFirebaseApp()
  const [user] = useAuthState(auth);
  const userId = user?.uid;

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return; // Wait until userId is available

      const response = await fetch(`/api/user/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener el usuario');
      }

      const userData = await response.json();
      setUserDb(userData);
      setLoading(false); // Set loading to false after fetching
    };

    fetchUser();
  }, [userId]); // Fetch when userId changes

  if (loading) return <Typography>Loading...</Typography>; // Show loading text while fetching

  return (
    <Container maxWidth="sm">
      <Header />
      <Paper elevation={3} style={{ padding: "20px", marginTop: "150px" }}>
        <Typography variant="h4" gutterBottom>
          Mi Perfil
        </Typography>
        <Profile user={userDb} />
      </Paper>
    </Container>
  );
};

export default ProfilePage;