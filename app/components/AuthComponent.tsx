// components/AuthComponent.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import Register from "./Register";
import Login from "./Login";
import { registerWithEmail, loginWithEmail } from "../../lib/firebase/auth";
import { Box } from "@mui/material"; // Import Box
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";

const AuthComponent = ({ isRegistering }: { isRegistering: boolean }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(""); // State for phone number
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  const [user, setUser] = useState<any>(null); // Type any or specific user type
  const router = useRouter(); // Initialize useRouter
  const dispatch = useDispatch<AppDispatch>();

  const handleAuth = async () => {
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      if (isRegistering) {
        await registerWithEmail(firstName, lastName, email, password, phone);
        alert("Registration successful! You can log in now.");
      } else {
        const loggedInUser = await loginWithEmail(dispatch, email, password);
        // Check if loggedInUser is not null before calling setUser
        if (loggedInUser) {
          setUser(loggedInUser);
          alert("Login successful!");          
          router.push("/"); // Redirect to home page after successful login
        } else {
          setError("Login failed. Please check your credentials.");
        }
      }
      setEmail("");
      setPassword("");
      setPhone("");
      setFirstName("");
      setLastName("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box mt={2}>
      {" "}
      {/* Use Box for margin top */}
      {isRegistering ? (
        <Register
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          phone={phone}
          setPhone={setPhone}
          handleRegister={handleAuth}
          loading={loading}
        />
      ) : (
        <Login
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleAuth}
          loading={loading}
        />
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </Box>
  );
};

export default AuthComponent;
