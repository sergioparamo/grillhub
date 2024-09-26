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
        <Link href="/events" className={styles.ctaButton}>Buscar Eventos</Link>
      </div>
    </section>
  );
};

export default Hero;

