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
    firstName: string;
    setFirstName: (firstName: string) => void;
    lastName: string;
    setLastName: (lastName: string) => void;
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    phone: string; // Add phone to the props
    setPhone: (phone: string) => void; // Function to set the phone number
    handleRegister: () => void;
    loading: boolean;
}