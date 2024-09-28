// app/profile/page.tsx
"use client";
import React from "react";
import { Container, Paper, Typography } from "@mui/material";
import Profile from "../components/Profile";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirebaseApp } from "../../lib/firebase/firebase";
import Header from "../components/Header";
const { auth } = getFirebaseApp();

const ProfilePage = () => {
  const [user] = useAuthState(auth);
  console.log(user)

  return (
    <Container maxWidth="sm">
      <Header />
      <Paper elevation={3} style={{ padding: "20px", marginTop: "150px" }}>
        <Typography variant="h4" gutterBottom>
          Mi Perfil
        </Typography>
        <Profile user={user} />
      </Paper>
    </Container>
  );
};

export default ProfilePage;