// app/components/Profile.tsx
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { User } from "../models/User";

interface ProfileProps {
  user: User | null | undefined; // Define el tipo del prop user
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  if (!user) {
    return <Typography>No hay información del usuario.</Typography>; // Manejo si el usuario es null
  }

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6">Nombre: {user.firstName || "Desconocido"}</Typography>
        <Typography variant="h6">Apellido: {user.lastName || "Desconocido"}</Typography>
        <Typography variant="h6">Email: {user.email}</Typography>
        <Typography variant="h6">Telefono: {user.phone}</Typography>
        {/* Agrega más detalles según sea necesario */}
      </CardContent>
    </Card>
  );
};

export default Profile;