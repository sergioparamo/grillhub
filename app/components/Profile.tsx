// app/components/Profile.tsx
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { User } from "firebase/auth"; // Asegúrate de importar el tipo User de Firebase

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
        <Typography variant="h6">Nombre: {user.displayName || "Desconocido"}</Typography>
        <Typography variant="body1">Email: {user.email}</Typography>
        {/* Agrega más detalles según sea necesario */}
      </CardContent>
    </Card>
  );
};

export default Profile;