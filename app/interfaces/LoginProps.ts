// Definir la interfaz para los props
export interface LoginProps {
    email: string;                      // Tipo para email
    setEmail: (email: string) => void; // Función para actualizar el email
    password: string;                   // Tipo para password
    setPassword: (password: string) => void; // Función para actualizar el password
    handleLogin: () => void;           // Función para manejar el login
    loading: boolean;                   // Estado de carga
}

export interface RegisterProps {
    email: string;                      // Tipo para email
    setEmail: (email: string) => void; // Función para actualizar el email
    password: string;                   // Tipo para password
    setPassword: (password: string) => void; // Función para actualizar el password
    handleRegister: () => void;           // Función para manejar el registro
    loading: boolean;                   // Estado de carga
}