// components/Hero.js
'use client';
import Link from "next/link";
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1>Encuentra los Mejores Eventos de Barbacoa</h1>
        <p>Descubre, participa y comparte experiencias en eventos de barbacoa cerca de ti.</p>
        <div className={styles.linkContainer}>
        <Link href="/events" className={styles.ctaButton}>Buscar Eventos</Link>
        </div>
        <div className={styles.linkContainer}>
          <Link href="/events/create" className={styles.ctaButton}>Crear Eventos</Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;

