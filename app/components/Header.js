// components/Header.js
"use client"; // Marcar este archivo como un componente de cliente

import Link from "next/link";
import styles from "./Header.module.css";
import { usePathname } from "next/navigation"; // Usamos usePathname

const Header = () => {
  const pathname = usePathname(); // Obtener la ruta actual

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">GrillHub</Link>
      </div>
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
    </header>
  );
};

export default Header;
