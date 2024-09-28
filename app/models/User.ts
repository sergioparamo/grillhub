// app/models/UserModel.ts

export interface User {
    uid: string;           // ID único del usuario
    email: string;  // Email del usuario, puede ser nulo
    displayName?: string;  // Nombre para mostrar (opcional)
    photoURL?: string;     // URL de la foto del usuario (opcional)
    // Añade otros campos según sea necesario
}