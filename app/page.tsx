"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirebaseApp } from "../lib/firebase/firebase";
import Header from "./components/Header";
import Hero from "./hero/Hero";
import Features from "./features/Features";
import Testimonials from "./testimonials/Testimonials";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { logout } from "../lib/firebase/auth";

const { auth } = getFirebaseApp();

const Home = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [sidebarWidth, setSidebarWidth] = useState("4%"); // Estado para controlar el ancho del Sidebar

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/auth");
    } catch (error) {
      console.error("Error during logout: ", error);
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {/* Header independiente */}
      <Header />

      {/* Contenedor principal */}
      <div style={{ display: "flex" }}>
        {user && (
          <Sidebar
            email={user.displayName || user.email || "Usuario"}
            handleLogout={handleLogout}
            setSidebarWidth={setSidebarWidth} // Pasamos el setter para actualizar el ancho
          />
        )}

        {/* Contenido principal con ajuste dinámico */}
        <div
          style={{
            marginLeft: user ? sidebarWidth : 0, // Ajuste del margen dinámico según el ancho del Sidebar
            width: user ? `calc(100% - ${sidebarWidth})` : "100%", // Ajuste del ancho dinámico
            transition: "width 0.3s ease, margin-left 0.3s ease",
            padding: "0px",
          }}
        >
          <main>
            <Hero />
            <Features />
            <Testimonials />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
