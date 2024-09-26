// components/Header.js
"use client"; // Marcar este archivo como un componente de cliente

import Link from "next/link";
import styles from "./Header.module.css";
import { usePathname } from "next/navigation"; // Usamos usePathname
import { AppBar } from "@mui/material";

const Header = () => {
  const pathname = usePathname(); // Obtener la ruta actual

  return (
    <AppBar
      position="fixed" // Hace que el Header esté fijo en la parte superior
      sx={{
        backgroundColor: "#333",
        zIndex: 1100, // Mayor que el Sidebar para que no se solape
        width: "100%", // Ocupa el ancho completo
      }}
    >
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/">GrillHub</Link>
        </div>
        {pathname !== "/auth" && ( // Condición para mostrar los enlaces solo si no estamos en la página de autenticación
          <nav>
            <ul className={styles.navList}>
              {pathname === "/" ? (
                <>
                  <li>
                    <Link href="/events">Eventos</Link>
                  </li>
                  <li>
                    <Link href="#features">Características</Link>
                  </li>
                  <li>
                    <Link href="#testimonials">Testimonios</Link>
                  </li>
                  <li>
                    <Link href="#contact">Contacto</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/">Inicio</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        )}
      </header>
    </AppBar>
  );
};

export default Header;
