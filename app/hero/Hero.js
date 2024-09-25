// components/Hero.js
'use client';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1>Encuentra los Mejores Eventos de Barbacoa</h1>
        <p>Descubre, participa y comparte experiencias en eventos de barbacoa cerca de ti.</p>
        <a href="/events" className={styles.ctaButton}>Buscar Eventos</a>
      </div>
    </section>
  );
};

export default Hero;

