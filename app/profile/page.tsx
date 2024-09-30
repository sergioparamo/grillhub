"use client";
import React, { useEffect, useState } from "react";
import { Container, Paper, Typography } from "@mui/material";
import Profile from "../components/Profile";
import Header from "../components/Header";
import { User } from "../models/User"; // Asegúrate de que User esté correctamente importado

const ProfilePage = () => {
  const [userDb, setUserDb] = useState<User | null>(null); // Estado para guardar los datos del usuario
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  // Obtener los datos del usuario desde localStorage al montar el componente
  useEffect(() => {
    const fetchUserFromLocalStorage = () => {
      const userData = localStorage.getItem("userInfo"); // Obtener los datos del usuario almacenados en localStorage
      if (userData) {
        try {
          const parsedUserInfo = JSON.parse(userData); // Convertir los datos en objeto y guardarlos en el estado
          const localUser: User | null = parsedUserInfo.user ? parsedUserInfo.user : null;
          setUserDb(localUser);
        } catch (error) {
          console.error("Error parsing user data from localStorage:", error);
        }
      }
      setLoading(false); // Dejar de cargar después de obtener los datos
    };

    fetchUserFromLocalStorage();
  }, []); // Ejecutar una sola vez al montar el componente

  if (loading) return <Typography>Loading...</Typography>; // Mostrar mientras se cargan los datos

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